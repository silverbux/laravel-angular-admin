<?php

namespace App\Http\Controllers;

class AngularController extends Controller
{
    /**
     * Serve the angular application.
     *
     * @return JSON
     */
    public function serveApp()
    {
        return view('index');
    }

    /**
     * Page for unsupported browsers.
     *
     * @return JSON
     */
    public function unsupported()
    {
        return view('unsupported_browser');
    }
}
