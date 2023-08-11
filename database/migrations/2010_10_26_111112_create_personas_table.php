<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('centralizado')->create('personas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre',255);
            $table->string('apellido',255)->nullable();
            $table->bigInteger('tipo_documento')->unsigned();
            $table->string('numero_documento',255);
            $table->string('tarjeta_profesional', 60);
            $table->foreign('tipo_documento')->references('id')->on('tipos_documentos');
            $table->text('firma')->nullable();
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
        // Schema::connection('centralizado')->dropIfExists('personas');
    }
}
