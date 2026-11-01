<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('annual_reports', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category')->nullable();
            $table->string('pdf_path');
            $table->integer('year');
            $table->date('date_posted');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('annual_reports');
    }
};
