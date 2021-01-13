<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FundController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => ['api', 'cors'],
    'prefix' => 'auth'
], function ($router) {

    //auth
    Route::post('/signup', [AuthController::class, 'register']);
    Route::post('/signin', [AuthController::class, 'login']);
    Route::post('/user', [AuthController::class, 'user']);
    Route::post('/token-refresh', [AuthController::class, 'refresh']);
    Route::post('/signout', [AuthController::class, 'signout']);


});


Route::group([
    'middleware' => ['api', 'cors'],
    'prefix' => 'fund'
], function ($router) {

    //auth
    Route::post('/fundlist', [FundController::class, 'funds']);
    Route::post('/listrequest', [FundController::class, 'funders']);
    Route::post('/newrequest', [FundController::class, 'fundrequest']);
    Route::post('/newfund', [FundController::class, 'newfund']);
    Route::post('/editrequest', [FundController::class, 'editrequest']);
    Route::post('/deleterequest', [FundController::class, 'deleterequest']);
    Route::post('/details', [FundController::class, 'details']);
    Route::post('/mydetails', [FundController::class, 'mydetails']);
    Route::post('/myrequests', [FundController::class, 'myfunds']);

});
