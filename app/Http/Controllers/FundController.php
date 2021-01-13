<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Models\funds\fundRequests;
use App\Models\funds\fund\fund;
use App\Models\User;

class FundController extends Controller
{

    public function __construct() {

    }


    /**
     * details to view settings per user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function mydetails() {

        $user = auth()->user()->name;

        $fundRequests = fundRequests::where("status", 1)->where('soft_deleted', 0)->where("author", $user)->count();
        $funds = fund::where("username", $user)->count();
        $users = User::where("name", $user)->get();

        return response()->json([
            'message' => 'success',
            'requests' => $fundRequests,
            'funds' => $funds,
            'updated_at' => $users[0]->updated_at,
            'status' => 202,
        ], 202);
    }

    /**
     * details to view settings
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function details() {

        $fundRequests = fundRequests::where("status", 1)->where('soft_deleted', 0)->count();
        $funds = fund::count();
        $users = User::count();

        return response()->json([
            'message' => 'success',
            'requests' => $fundRequests,
            'funds' => $funds,
            'users' => $users,
            'status' => 202,
        ], 202);
    }



    /**
     * user fund list
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function myfunds() {

        $user = auth()->user()->name;
        $fundRequests = fundRequests::where("author", $user)->where('soft_deleted', 0)->orderByDesc('id')->get();

        return response()->json([
            'message' => 'User signed up',
            'requests' => $fundRequests,
            'status' => 202,
        ], 202);
    }


    /**
     * fund list
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function funds() {

        $fundRequests = fundRequests::where("status", 1)->where('soft_deleted', 0)->orderByDesc('id')->get();

        return response()->json([
            'message' => 'User signed up',
            'requests' => $fundRequests,
            'status' => 202,
        ], 202);
    }


    /**
     * soft delete a fund request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleterequest(Request $request) {

        $req = Validator::make($request->all(), [
            'id' => 'required|integer',
        ]);

        if($req->fails()){
            return response()->json($req->errors()->toJson(), 400);
        }

        $fundRequests = fundRequests::whereId($request->id)->update("soft_deleted", "1");

        if($fundRequests != 0) {
            return response()->json([
                'message' => 'Deleted',
                'status' => 202,
            ], 202);
        }else{
            return response()->json([
                'message' => 'failed to delete',
                'status' => 403,
            ], 403);
        }
    }


    /**
     * Funders list by fund id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function funders(Request $request) {

        $req = Validator::make($request->all(), [
            'fund_id' => 'required|integer',
        ]);

        if($req->fails()){
            return response()->json($req->errors()->toJson(), 400);
        }

        $funds = fund::where("fund_requests_id", $request->fund_id)->get();
        return response()->json([
            'message' => 'User signed up',
            'funds' => $funds,
            'status' => 202,
        ], 202);
    }


    /**
     * add a new fund request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function fundrequest(Request $request) {

        $req = Validator::make($request->all(), [
            'author' => 'required|string|between:3,100',
            'title' => 'required|string|between:3,50|',
            'description' => 'required|string|between:20,500',
            'imageurl' => 'required|string|url|between:10,100',
            'requiredFund' => 'required|regex:/^[0-9]+(\.[0-9][0-9]?)?$/',
        ]);

        if($req->fails()){
            return response()->json($req->errors()->toJson(), 400);
        }

        $fundRequest = fundRequests::create(array_merge(
            ["author" => $request->author],
            ["title" => $request->title],
            ["description" => $request->description],
            ["imageurl" => $request->imageurl],
            ["currentFund" => '0'],
            ["requiredFund" => $request->requiredFund],
        ));

        return response()->json([
            'message' => 'Inserted!',
            'request' => $fundRequest,
            'status' => 202,
        ], 202);
    }


    /**
     * edit a fund request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function editrequest(Request $request) {

        $req = Validator::make($request->all(), [
            'title' => 'required|string|between:3,50|',
            'description' => 'required|string|between:20,500',
            'imageurl' => 'required|string|url|between:10,100',
            'requiredFund' => 'required|regex:/^[0-9]+(\.[0-9][0-9]?)?$/',
            'id' => 'required|integer',
        ]);

        if($req->fails()){
            return response()->json($req->errors()->toJson(), 400);
        }

        $request = fundRequests::whereId($request->id)->update(

            array_merge(
                ["title" => $request->title],
                ["description" => $request->description],
                ["imageurl" => $request->imageurl],
                ["requiredFund" => $request->requiredFund],
            )
        );

        if($request != 0) {
            return response()->json([
                'message' => 'Updated',
                'status' => 202,
            ], 202);
        }else{
            return response()->json([
                'message' => 'failed to update',
                'status' => 403,
            ], 403);
        }
    }


    /**
     * add a new fund
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function newfund(Request $request) {

        $req = Validator::make($request->all(), [
            'username' => 'required|string|between:3,100',
            'userid' => 'required|integer',
            'fund_requests_id' => 'required|integer',
            'amount' => 'required|regex:/^[0-9]+(\.[0-9][0-9]?)?$/',
        ]);

        if($req->fails()){
            return response()->json($req->errors()->toJson(), 400);
        }

        $Request = fund::create(array_merge(
            ["username" => $request->username],
            ["userid" => $request->userid],
            ["fund_requests_id" => $request->fund_requests_id],
            ["amount" => $request->amount],
        ));

        return response()->json([
            'message' => 'Inserted!',
            'fund' => $Request,
            'status' => 202,
        ], 202);


    }

}
