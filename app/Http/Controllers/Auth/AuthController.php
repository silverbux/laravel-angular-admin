<?php

namespace App\Http\Controllers\Auth;

use Auth;
use JWTAuth;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Socialite;
use Bican\Roles\Models\Role;
use Bican\Roles\Models\Permission;

class AuthController extends Controller
{
    private function getRolesAbilities()
    {
        $abilities = array();
        $roles = Role::all();

        foreach ($roles as $role) {
            if (!empty($role->slug)) {
                $abilities[$role->slug] = array();
                $rolePermission = $role->permissions()->get();

                foreach ($rolePermission as $permission) {
                    if (!empty($permission->slug)) {
                        array_push($abilities[$role->slug], $permission->slug);
                    }
                }
            }
        }

        return $abilities;
    }

    public function getAuthenticatedUser()
    {
        if (Auth::check()) {
            $user = Auth::user();
            $token = JWTAuth::fromUser($user);
            $abilities = $this->getRolesAbilities();
            $userRole = array();

            foreach ($user->Roles as $role) {
                $userRole [] = $role->slug;
            }

            return response()->success(compact('user', 'token', 'abilities', 'userRole'));
        } else {
            return response()->error('unauthorized', 401);
        }
    }

    /**
     * Redirect the user to the Oauth Provider authentication page.
     *
     * @return Response
     */
    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    /**
     * Obtain the user information from Oauth Provider.
     *
     * @return Response
     */
    public function handleProviderCallback($provider)
    {
        try {
            $user = Socialite::driver($provider)->user();
        } catch (Exception $e) {
            return Redirect::to('auth/'.$provider);
        }

        $authUser = $this->findOrCreateUser($user, $provider);

        \Auth::login($authUser, true);

        return \Redirect::to('/#/login-loader');
    }

    private function findOrCreateUser($githubUser, $provider)
    {
        if ($authUser = User::where('oauth_provider_id', $githubUser->getId())->where('oauth_provider', '=', $provider)->first()) {
            return $authUser;
        }

        return User::create([
            'name' => $githubUser->name,
            'email' => $githubUser->email,
            'oauth_provider' => $provider,
            'oauth_provider_id' => $githubUser->getId(),
            'avatar' => $githubUser->avatar
        ]);
    }

    public function postLogin(Request $request)
    {
        $this->validate($request, [
            'email'    => 'required|email',
            'password' => 'required|min:8',
        ]);

        $credentials = $request->only('email', 'password');

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->error('Invalid credentials', 401);
            }
        } catch (\JWTException $e) {
            return response()->error('Could not create token', 500);
        }

        $user = Auth::user();
        $token = JWTAuth::fromUser($user);
        $abilities = $this->getRolesAbilities();
        $userRole = array();

        foreach ($user->Roles as $role) {
            $userRole [] = $role->slug;
        }

        return response()->success(compact('user', 'token', 'abilities', 'userRole'));
    }

    public function postRegister(Request $request)
    {
        $this->validate($request, [
            'name'       => 'required|min:3',
            'email'      => 'required|email|unique:users',
            'password'   => 'required|min:8',
        ]);

        $user = new User;
        $user->name = trim($request->name);
        $user->email = trim(strtolower($request->email));
        $user->password = bcrypt($request->password);
        $user->save();

        $token = JWTAuth::fromUser($user);

        return response()->success(compact('user', 'token'));
    }
}
