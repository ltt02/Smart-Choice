<script setup>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>

<template>
  <AppHeader />
  <div class="container">
    <div class="contact row">
      <div class="col-sm-6">
        <h3>Contact Us</h3>
        <form action="" class="row">
          <div class="row justify-content-between">
            <div class="input-container col-sm-6 pe-2">
              <input required class="form-control" style="padding: 5px;" maxlength="20" type="text" placeholder="Name">
            </div>
            <div class="input-container col-sm-6">
              <input required class="form-control" style="padding: 5px;" maxlength="20" type="text" placeholder="Email">
            </div>
            <div class="input-container">
              <textarea required class="col-12 mt-2 form-control" style="padding: 5px;" name="" id="" cols="30" rows="3"
                placeholder="Messages"></textarea>

              <button class="col-12 mt-2 btn btn-primary shadow w-25" type="submit">Send</button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-sm-6">
        <h3>Our Location</h3>
        <div class="w-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.8320067700747!2d105.76665337472711!3d10.030717940076265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zxJDhuqFpIGjhu41jIEPhuqduIFRoxqE!5e0!3m2!1svi!2s!4v1682221349612!5m2!1svi!2s"
            width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  </div>

  <AppFooter />
</template>

<style>
@import '../assets/form.css';

@media (min-width: 1024px) {
  .contact {
    margin-top: 76px;
    min-height: 50vh;
  }
}
</style>