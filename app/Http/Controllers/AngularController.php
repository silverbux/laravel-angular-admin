<?php

namespace App\Http\Controllers;
use App\User;
use Bican\Roles\Models\Role;
use Bican\Roles\Models\Permission;

class AngularController extends Controller
{
    public function serveApp()
    {
        return view('index');
    }

    public function unsupported()
    {
        return view('unsupported_browser');
    }
}
