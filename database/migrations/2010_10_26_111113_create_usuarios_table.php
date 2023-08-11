<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('centralizado')->create('usuarios', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('id_persona')->unsigned();
            $table->foreign('id_persona')->references('id')->on('personas');
            $table->string('usuario');
            $table->string('email',191);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->integer('intentos_login')->default(0);
            $table->text('observaciones')->nullable();
            $table->boolean('estado')->default(1);
            $table->boolean('super_administrador')->default(0);
            $table->datetime('ultimo_login')->nullable();
            $table->string('ultimo_login_ip')->nullable();
            $table->integer('intentos')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Schema::connection('centralizado')->dropIfExists('usuarios');
    }
}
