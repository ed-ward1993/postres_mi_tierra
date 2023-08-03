<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LogUserLogin extends Model
{
    use HasFactory;
    protected $table      = 'log_user_login';
    protected $connection = "centralizado";
    public $timestamps    = false;
}
