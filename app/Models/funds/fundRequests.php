<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class fundRequests extends Model
{
    use HasFactory;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'author',
        'title',
        'description',
        'imageurl',
        'currentFund',
        'requiredFund',
        'status',
    ];

    /**
     * serves as a "black-list".
     *
     * @var array
     */
    protected $guarded = [
        'id',
        'created_at'
    ];


    public function funds(){
        return $this->hasMany("App/Models/funds/fund");
    }

}
