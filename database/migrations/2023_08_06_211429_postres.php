<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('dinamico')->create('postres', function (Blueprint $table) {
            $table->bigIncrements('id_postres');
            $table->string('nombre',55);
            $table->unsignedBigInteger('id_categoria');
            $table->foreign('id_categoria')->references('id_categorias')->on('categorias');
            $table->string('codigo_barras')->unique();
            $table->double('precio');
            $table->integer('cantidad_stock');
            $table->boolean('estado')->default(true);
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
        Schema::connection('dinamico')->dropIfExists('postres');
    }
};
