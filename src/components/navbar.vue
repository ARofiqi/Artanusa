<template>
  <div class="bg-primary flex justify-between py-5 px-10">
    <h1 class="text-gray-100 font-bold text-2xl">Artanusa</h1>
    <nav>
      <ul class="flex gap-2">
        <li class="text-gray-100 hover:bg-blue-900 px-4 py-2 rounded-lg transition-all"><a href="#home">Home</a></li>
        <li class="text-gray-100 hover:bg-blue-900 px-4 py-2 rounded-lg transition-all"><a href="#fitur">Fitur</a></li>
        <li class="text-gray-100 hover:bg-blue-900 px-4 py-2 rounded-lg transition-all"><a href="#team">Team</a></li>
        <li class="text-gray-100 hover:bg-blue-900 px-4 py-2 rounded-lg transition-all"><a href="#about">About</a></li>
        <li class="text-gray-100 hover:bg-blue-900 px-4 py-2 rounded-lg transition-all"><a href="#contact">Contact Us</a></li>
      </ul>
    </nav>
    <div class="flex gap-2">
      <div class="flex justify-center items-center"><router-link class="text-primary bg-gray-100 font-semibold px-3 py-1 rounded-sm border-2 border-gray-100 hover:opacity-70" to="/login">Login</router-link></div>
      <div class="flex justify-center items-center"><router-link class="text-gray-100 bg-primary font-semibold px-3 py-1 rounded-sm border-[1px] border-gray-100 hover:opacity-70" to="/register">Register</router-link></div>
    </div>
  </div>
</template>
