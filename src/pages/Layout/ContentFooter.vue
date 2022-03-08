<template>
  <footer class="footer">
    <div class="container-fluid">
      <!-- <ul class="nav">
        <li class="nav-item">
          <a
            href="http://creative-tim.com"
            target="_blank"
            rel="noopener"
            class="nav-link"
          >
            Creative Tim
          </a>
        </li>
        <li class="nav-item">
          <a
            href="https://www.creative-tim.com/presentation"
            target="_blank"
            rel="noopener"
            class="nav-link"
          >
            About Us
          </a>
        </li>
        <li class="nav-item">
          <a
            href="http://blog.creative-tim.com"
            target="_blank"
            rel="noopener"
            class="nav-link"
          >
            Blog
          </a>
        </li>
      </ul> -->
      <div class="copyright">
        &copy; {{ year }}, made by
        <a href="https://www.vectolabs.com/" target="_blank" rel="noopener"
          >Vectolabs Technologies</a
        >
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style></style>
