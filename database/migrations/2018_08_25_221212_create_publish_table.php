<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePublishTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('publish', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id'); 
            $table->integer('published')->default(0);
            $table->integer('paper_piece_id')->default(0); 
            $table->integer('picture_piece_id')->default(0); 
            $table->integer('pdf_piece_id')->default(0);
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
        Schema::dropIfExists('publish');
    }
}
