<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Hash;
use DB;

class AuthController extends Controller
{

    public function register(Request $request){
        $this->validate($request,[
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'password_confirmation' => 'required|same:password'
        ], $this->validationErrorMessages());

        $user = new User($request->all());
        $user->password = bcrypt($request->password);
        // $user->photo = '/storage/photo/default-avatar.png';
        $user->save();

        return response()->json([
            'success' => true
        ]);
    }

    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|min:6',
        ], $this->validationErrorMessages());

        $request = Request::create('/oauth/token', 'POST', [
            'grant_type' => 'password',
            'client_id' => config('services.vue_client.id'),
            'client_secret' => config('services.vue_client.secret'),
            'username' => $request->email,
            'password' => $request->password,
        ]);
        return app()->handle($request);
    }

    public function logout()
    {
        $accessToken = auth()->user()->token();

        DB::table('oauth_access_tokens')->where('id', $accessToken->id)->delete();
        DB::table('oauth_refresh_tokens')->where('access_token_id', $accessToken->id)->delete();

        return response()->json(['status' => 200]);
    }

    /**
     * Get the login validation rules.
     *
     * @return array
     */
    protected function rules()
    {
        return [
            'email' => 'required|email',
            'password' => 'required|min:6',
        ];
    }

    /**
     * Get the login validation error messages.
     *
     * @return array
     */
    protected function validationErrorMessages()
    {
        return [];
    }

}
