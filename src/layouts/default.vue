<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-theme fixed-top p-0"
        data-navbar-on-scroll="data-navbar-on-scroll">
        <!-- <div class="container"><a class="navbar-brand fw-normal ls-2" href="../index.html">掲示板（FastAPI + Nuxt3） </a> -->
        <div class="container">
            <NuxtLink to="/" class="navbar-brand fw-normal ls-2">掲示板（FastAPI + Nuxt3） </NuxtLink>
            <button class="navbar-toggler p-0" type="button" data-bs-toggle="collapse"
                data-bs-target="#primaryNavbarCollapse" aria-controls="primaryNavbarCollapse" aria-expanded="false"
                aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="primaryNavbarCollapse">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <NuxtLink v-bind:to="{ name: 'forums' }" active-class="active" class="nav-link">
                            掲示板一覧
                        </NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink v-bind:to="{ name: 'forums-add' }" active-class="active" class="nav-link">
                            掲示板作成
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- ===============================================-->
    <!--    Main Content-->
    <!-- ===============================================-->
    <main class="main" id="top">
        <div class="preloader" id="preloader" data-preloader>
            <div class="preloader-wrapper big active" data-preloader>
                <div class="spinner-layer spinner-white-only">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
        </div>


        <!-- ============================================-->
        <!-- <section> begin ============================-->
        <section>
            <slot />
        </section>
        <!-- <section> close ============================-->
        <!-- ============================================-->


    </main>
    <!-- ===============================================-->
    <!--    End of Main Content-->
    <!-- ===============================================-->


    <footer class="footer text-center bg-light py-3 position-absolute w-100 bottom-0">
    </footer>
</template>