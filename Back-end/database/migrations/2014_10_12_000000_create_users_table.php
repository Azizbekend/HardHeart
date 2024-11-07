<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->date('age');
            $table->string('gender');
            $table->string('role');
            $table->string('description')->nullable($value = true);
            $table->string('city')->nullable($value = true);
            $table->integer('weight')->nullable($value = true);
            $table->integer('height')->nullable($value = true);
            $table->integer('goal')->nullable($value = true);
            $table->integer('smoking')->nullable($value = true);
            $table->integer('alcohol')->nullable($value = true);
            $table->integer('bodyType')->nullable($value = true);
            $table->integer('financialSituation')->nullable($value = true);
            $table->integer('zadiak')->nullable($value = true);
            $table->date('date_creat')->nullable($value = true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
