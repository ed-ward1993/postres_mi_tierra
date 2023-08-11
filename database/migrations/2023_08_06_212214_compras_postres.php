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
        Schema::connection('dinamico')->create('compras_prostres', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('id_compra');
            $table->unsignedBigInteger('id_prostres');
            $table->integer('cantidad');
            $table->double('total');
            $table->boolean('estado')->default(true);
            $table->timestamps();
    
            $table->foreign('id_compra')->references('id_compra')->on('compras');
            $table->foreign('id_prostres')->references('id_postres')->on('postres');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('dinamico')->dropIfExists('compras_postres');
    }
};
