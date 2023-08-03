<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostresUsuarioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('centralizado')->dropIfExists('postres_usuario');
        Schema::connection('centralizado')->create('postres_usuario', function (Blueprint $table) {
            $table->bigIncrements('id');
            // $table->bigInteger('tipo_documento')->unsigned();
            $table->bigInteger('id_postres')->unsigned();
            $table->foreign('id_postres')->references('id')->on('postres');
            $table->bigInteger('id_usuario')->unsigned();
            $table->foreign('id_usuario')->references('id')->on('usuarios');
            $table->boolean('estado')->default(1);
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
        Schema::connection('centralizado')->dropIfExists('postres_usuario');
    }
}
