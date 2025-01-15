<template>
  <div class="w-full bg-gray-100 pt-24">
    <div class="bg-gray-100 flex flex-col-reverse lg:flex-row align-middle w-full px-8 md:px-20 py-16 md:py-32">
      <div class="lg:w-1/2 w-full flex flex-col justify-center gap-4 text-left lg:text-left">
        <h2 class="text-lg md:text-xl font-semibold text-gray-900" data-aos="fade-right" data-aos-delay="50">Halo, Selamat datang!</h2>
        <h1 class="text-3xl md:text-5xl font-bold text-gray-900" data-aos="fade-right" data-aos-delay="150">ArtaNusa Membantu Mengelola Keuanganmu Dengan Mudah</h1>
        <p class="text-sm md:text-base text-gray-900" data-aos="fade-right" data-aos-delay="200">
          Capai tujuan keuanganmu dengan fitur pengelolaan anggaran yang cerdas dan fleksibel, serta nikmati fleksibilitas pengelolaan setiap bulannya
        </p>
        <div data-aos="fade-right" data-aos-delay="250">
          <button class="bg-primary mt-4 text font-semibold text-gray-100 px-10 py-2 rounded-md border-[1px] border-primary transition-all hover:bg-gray-100 hover:text-primary">
            <router-link to="/login">Try it</router-link>
          </button>
        </div>
      </div>
      <div class="lg:w-1/2 w-full flex justify-center mt-3 lg:mt-0">
        <img class="w-full mb-5 max-w-sm md:max-w-md lg:max-w-full" src="../assets/hero.png" alt="gambar hero" data-aos="fade-left" data-aos-delay="50" />
      </div>
    </div>
    <div id="fitur" class="bg-secondary w-full py-16 md:py-32">
      <h2 class="text-center text-3xl md:text-4xl font-bold text-gray-900">Fitur Kami</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-8 md:px-20 pt-10">
        <div class="bg-gray-100 px-4 py-6 rounded-md shadow-lg" data-aos="fade-up">
          <img class="h-40 mx-auto" src="../assets/fitur1.png" alt="Fitur 1" />
          <h3 class="text-2xl font-semibold my-3 text-primary text-center">Rencana Keuangan</h3>
          <p class="text-md font-light text-primary text-justify">
            Kami membantu Anda merencanakan keuangan dengan menetapkan target seperti menabung untuk kebutuhan tertentu dalam waktu yang Anda tentukan. Anda bisa melihat progress dan cara mencapai target dengan lebih mudah.
          </p>
        </div>
        <div class="bg-gray-100 px-4 py-6 rounded-md shadow-lg" data-aos="fade-up" data-aos-delay="50">
          <img class="h-40 mx-auto" src="../assets/fitur2.png" alt="Fitur 2" />
          <h3 class="text-2xl font-semibold my-3 text-primary text-center">Pengaturan Anggaran</h3>
          <p class="text-md font-light text-primary text-justify">ArtaNusa memberikan saran cara mengatur pengeluaran dan pendapatan Anda, agar keuangan Anda tetap sehat dan terkendali setiap bulan.</p>
        </div>
        <div class="bg-gray-100 px-4 py-6 rounded-md shadow-lg" data-aos="fade-up" data-aos-delay="100">
          <img class="h-40 mx-auto" src="../assets/fitur3.png" alt="Fitur 3" />
          <h3 class="text-2xl font-semibold my-3 text-primary text-center">Simulasi Keuangan</h3>
          <p class="text-md font-light text-primary text-justify">
            Dengan fitur simulasi, Anda bisa mencoba beberapa rencana keuangan dan melihat mana yang paling cocok untuk kebutuhan Anda, misalnya memilih cara menabung yang lebih efektif.
          </p>
        </div>
        <div class="bg-gray-100 px-4 py-6 rounded-md shadow-lg" data-aos="fade-up" data-aos-delay="150">
          <img class="h-40 mx-auto" src="../assets/fitur4.png" alt="Fitur 4" />
          <h3 class="text-2xl font-semibold my-3 text-primary text-center">Pengingat Keuangan</h3>
          <p class="text-md font-light text-primary text-justify">Kami mengingatkan Anda untuk membayar tagihan tepat waktu, mengelola pengeluaran bulanan, dan membantu menjaga keuangan Anda tetap pada jalurnya.</p>
        </div>
      </div>
    </div>
    <div id="team" class="bg-gray-100 px-8 md:px-20 py-16 md:py-32">
      <div class="pb-10 md:pb-20">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 text-center">Our Team</h2>
        <p class="font-light text-gray-900 text-center mt-5">
          Di balik ArtaNusa, ada tim yang berdedikasi untuk membantu Anda mencapai tujuan keuangan dengan mudah dan efektif. Kami adalah sekelompok profesional dengan latar belakang di bidang teknologi dan keuangan, yang bekerja sama untuk
          menciptakan solusi keuangan terbaik bagi Anda.
        </p>
      </div>
      <div class="flex flex-wrap justify-center gap-10">
        <div class="flex flex-col md:flex-row bg-white p-6 rounded-lg shadow-sm" data-aos="fade-right" data-aos-delay="50">
          <img src="../assets/tim1.jpg" alt="tim1" class="w-32 md:w-[10rem] h-32 md:h-auto rounded-full mx-auto md:mx-0" />
          <div class="mt-4 md:mt-0 md:ml-5 flex flex-col gap-2 justify-center">
            <h3 class="text-xl md:text-3xl text-gray-900 font-semibold text-center md:text-left">Darmawan Suka P</h3>
            <p class="text-sm text-gray-900 text-center md:text-left">Faunder & Project Manager</p>
            <div class="flex justify-center md:justify-start gap-5 mt-5">
              <a href="https://www.instagram.com/_prajadiputra?igsh=MTJ6cmpiajdnNDVtNg==" target="_blank" class="hover:opacity-70">
                <img src="../assets/icons/instagram.svg" alt="instagram" class="w-6" />
              </a>
              <a href="https://github.com/prajadiputra22/" target="_blank" class="hover:opacity-70">
                <img src="../assets/icons/github.svg" alt="github" class="w-6" />
              </a>
              <a href="http://www.linkedin.com/in/darmawan-suka-prajadiputra-466029290" target="_blank" class="hover:opacity-70">
                <img src="../assets/icons/linkedin.svg" alt="linkedin" class="w-6" />
              </a>
            </div>
          </div>
        </div>
        <div class="flex flex-col md:flex-row bg-white p-6 rounded-lg shadow-sm" data-aos="fade-right" data-aos-delay="100">
          <img src="../assets/tim2.jpg" alt="tim2" class="w-32 md:w-[10rem] h-32 md:h-auto rounded-full mx-auto md:mx-0" />
          <div class="mt-4 md:mt-0 md:ml-5 flex flex-col gap-2 justify-center">
            <h3 class="text-xl md:text-3xl text-gray-900 font-semibold text-center md:text-left">Ahmad Rofiqi</h3>
            <p class="text-sm text-gray-900 text-center md:text-left">Fullstack Developer</p>
            <div class="flex justify-center md:justify-start gap-5 mt-5">
              <a href="https://www.instagram.com/aro_543/" target="_blank" class="hover:opacity-70">
                <img src="../assets/icons/instagram.svg" alt="instagram" class="w-6" />
              </a>
              <a href="https://github.com/ARofiqi" target="_blank" class="hover:opacity-70">
                <img src="../assets/icons/github.svg" alt="github" class="w-6" />
              </a>
              <a href="https://www.linkedin.com/in/ahmad-rofiqi-8aa90417b/" target="_blank" class="hover:opacity-70">
                <img src="../assets/icons/linkedin.svg" alt="linkedin" class="w-6" />
              </a>
            </div>
          </div>
        </div>
        <div class="flex flex-col md:flex-row bg-white p-6 rounded-lg shadow-sm" data-aos="fade-right" data-aos-delay="150">
          <img src="../assets/tim3.jpg" alt="tim3" class="w-32 md:w-[10rem] h-32 md:h-auto rounded-full mx-auto md:mx-0" />
          <div class="mt-4 md:mt-0 md:ml-5 flex flex-col gap-2 justify-center">
            <h3 class="text-xl md:text-3xl text-gray-900 font-semibold text-center md:text-left">Riska Nopiyanti</h3>
            <p class="text-sm text-gray-900 text-center md:text-left">UI/UX Designer</p>
            <div class="flex justify-center md:justify-start gap-5 mt-5">
              <a href="https://www.instagram.com/itzzmeriska?igsh=MW5lajNxOXUwcGo2ZQ==" target="_blank" class="hover:opacity-70">
                <img src="../assets/icons/instagram.svg" alt="instagram" class="w-6" />
              </a>
              <a href="https://github.com/riskanopiyanti" target="_blank" class="hover:opacity-70">
                <img src="../assets/icons/github.svg" alt="github" class="w-6" />
              </a>
              <a href="https://www.linkedin.com/in/riska-nopiyanti-492057337/" target="_blank" class="hover:opacity-70">
                <img src="../assets/icons/linkedin.svg" alt="linkedin" class="w-6" />
              </a>
            </div>
          </div>
        </div>
        <div class="flex flex-col md:flex-row bg-white p-6 rounded-lg shadow-sm" data-aos="fade-right" data-aos-delay="200">
          <img src="../assets/tim4.jpg" alt="tim4" class="w-32 md:w-[10rem] h-32 md:h-auto rounded-full mx-auto md:mx-0" />
          <div class="mt-4 md:mt-0 md:ml-5 flex flex-col gap-2 justify-center">
            <h3 class="text-xl md:text-3xl text-gray-900 font-semibold text-center md:text-left">M. Abdurrahman</h3>
            <p class="text-sm text-gray-900 text-center md:text-left">Database Administrator (DBA)</p>
            <div class="flex justify-center md:justify-start gap-5 mt-5">
              <a href="https://www.instagram.com/iniidamen_/profilecard/?igsh=MW40Mmg3aDJjODAzNg==" target="_blank" class="hover:opacity-70">
                <img src="../assets/icons/instagram.svg" alt="instagram" class="w-6" />
              </a>
              <a href="https://github.com/abdurhmnmhd" target="_blank" class="hover:opacity-70">
                <img src="../assets/icons/github.svg" alt="github" class="w-6" />
              </a>
              <a href="https://www.linkedin.com/in/muhamad-abdurahman-060636255?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" class="hover:opacity-70">
                <img src="../assets/icons/linkedin.svg" alt="linkedin" class="w-6" />
              </a>
            </div>
          </div>
        </div>
        <div class="flex flex-col md:flex-row bg-white p-6 rounded-lg shadow-sm" data-aos="fade-right" data-aos-delay="250">
          <img src="../assets/tim5.jpg" alt="tim5" class="w-32 md:w-[10rem] h-32 md:h-auto rounded-full mx-auto md:mx-0" />
          <div class="mt-4 md:mt-0 md:ml-5 flex flex-col gap-2 justify-center">
            <h3 class="text-xl md:text-3xl text-gray-900 font-semibold text-center md:text-left">Asril Hidayat</h3>
            <p class="text-sm text-gray-900 text-center md:text-left">Quality Assurance (QA) / Tester</p>
            <div class="flex justify-center md:justify-start gap-5 mt-5">
              <a href="https://www.instagram.com/asrilhdyt?igsh=MW5mODJkNXI3OGZ5eQ==" target="_blank" class="hover:opacity-70">
                <img src="../assets/icons/instagram.svg" alt="instagram" class="w-6" />
              </a>
              <a href="https://github.com/Asrilhidayat" target="_blank" class="hover:opacity-70">
                <img src="../assets/icons/github.svg" alt="github" class="w-6" />
              </a>
              <a href="https://www.linkedin.com/in/asril-hidayat-854b39310/" target="_blank" class="hover:opacity-70">
                <img src="../assets/icons/linkedin.svg" alt="linkedin" class="w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="about" class="bg-gray-100">
      <svg class="bg-gray-100" id="wave" style="transform: rotate(0deg); transition: 0.3s" viewBox="0 0 1440 170" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
            <stop stop-color="rgba(220, 231, 252, 1)" offset="0%"></stop>
            <stop stop-color="rgba(220, 231, 252, 1)" offset="100%"></stop>
          </linearGradient>
        </defs>
        <path
          style="transform: translate(0, 0px); opacity: 1"
          fill="url(#sw-gradient-0)"
          d="M0,119L24,99.2C48,79,96,40,144,45.3C192,51,240,102,288,107.7C336,113,384,74,432,59.5C480,45,528,57,576,51C624,45,672,23,720,36.8C768,51,816,102,864,110.5C912,119,960,85,1008,85C1056,85,1104,119,1152,121.8C1200,125,1248,96,1296,93.5C1344,91,1392,113,1440,121.8C1488,130,1536,125,1584,110.5C1632,96,1680,74,1728,70.8C1776,68,1824,85,1872,76.5C1920,68,1968,34,2016,22.7C2064,11,2112,23,2160,34C2208,45,2256,57,2304,56.7C2352,57,2400,45,2448,36.8C2496,28,2544,23,2592,34C2640,45,2688,74,2736,70.8C2784,68,2832,34,2880,19.8C2928,6,2976,11,3024,36.8C3072,62,3120,108,3168,130.3C3216,153,3264,153,3312,136C3360,119,3408,85,3432,68L3456,51L3456,170L3432,170C3408,170,3360,170,3312,170C3264,170,3216,170,3168,170C3120,170,3072,170,3024,170C2976,170,2928,170,2880,170C2832,170,2784,170,2736,170C2688,170,2640,170,2592,170C2544,170,2496,170,2448,170C2400,170,2352,170,2304,170C2256,170,2208,170,2160,170C2112,170,2064,170,2016,170C1968,170,1920,170,1872,170C1824,170,1776,170,1728,170C1680,170,1632,170,1584,170C1536,170,1488,170,1440,170C1392,170,1344,170,1296,170C1248,170,1200,170,1152,170C1104,170,1056,170,1008,170C960,170,912,170,864,170C816,170,768,170,720,170C672,170,624,170,576,170C528,170,480,170,432,170C384,170,336,170,288,170C240,170,192,170,144,170C96,170,48,170,24,170L0,170Z"
        ></path>
      </svg>
      <div class="bg-secondary text-gray-900 py-24">
        <h2 class="text-center text-4xl font-bold mb-10">About Us</h2>
        <div class="flex flex-col md:flex-row items-center px-5 md:px-10 gap-10">
          <div class="w-full md:w-1/2">
            <img src="../assets/about.png" alt="about" class="mx-auto" />
          </div>
          <div class="w-full md:w-1/2 flex flex-col gap-5">
            <p class="indent-10 text-justify">
              ArtaNusa adalah platform web manajemen keuangan yang dirancang untuk membantu pengguna dalam merencanakan dan mencapai tujuan keuangan mereka secara efektif. Terinspirasi dari kata "Arta" yang berarti kekayaan dalam bahasa
              Sansekerta dan "Nusa" yang melambangkan kepulauan Indonesia, ArtaNusa hadir untuk membimbing masyarakat menuju kesejahteraan melalui teknologi.
            </p>
            <p class="indent-10 text-justify">
              Aplikasi ini memberikan kemudahan bagi pengguna dalam menetapkan target keuangan, seperti menabung hingga jumlah tertentu, dan memberikan rekomendasi pengelolaan keuangan yang optimal. Dengan fitur-fitur canggih seperti
              perencanaan anggaran yang disesuaikan, simulasi rencana keuangan, serta sistem pengingat yang proaktif, ArtaNusa membantu pengguna tetap fokus dalam mencapai tujuan finansial mereka.
            </p>
            <p class="indent-10 text-justify">
              ArtaNusa tidak hanya menawarkan solusi keuangan, tetapi juga fleksibilitas dalam menyesuaikan skenario keuangan, dengan algoritma cerdas yang memberikan rekomendasi tabungan ideal dan estimasi waktu pencapaian. Bersama
              ArtaNusa, kami percaya bahwa setiap orang dapat meraih kesejahteraan finansial dengan perencanaan yang tepat dan strategi yang terukur.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>
