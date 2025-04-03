<template>
  <BContainer fluid class="footer bg-dark text-white pt-5 pb-4">
    <BRow>
      <!-- Company Info -->
      <BCol md="4" class="mb-4 mb-md-0">
        <h5 class="text-uppercase mb-4" style="color: #20c997;">FANA-MIND</h5>
        <p>Fana-Mind Online Learning Platform.</p>
        <div class="social-icons mt-4">
          <font-awesome-icon 
            :icon="['fab', 'facebook-f']" 
            class="me-3 social-icon"
            size="lg"
          />
          <font-awesome-icon 
            :icon="['fab', 'twitter']" 
            class="me-3 social-icon"
            size="lg"
          />
          <font-awesome-icon 
            :icon="['fab', 'instagram']" 
            class="me-3 social-icon"
            size="lg"
          />
          <font-awesome-icon 
            :icon="['fab', 'linkedin-in']" 
            class="social-icon"
            size="lg"
          />
        </div>
      </BCol>

      <!-- Quick Links -->
      <BCol md="2" class="mb-4 mb-md-0">
        <h5 class="text-uppercase mb-4">Quick Links</h5>
        <ul class="list-unstyled">
          <li class="mb-2"><a href="#" class="text-white text-decoration-none hover-accent">Home</a></li>
          <li class="mb-2"><a href="#" class="text-white text-decoration-none hover-accent">About</a></li>
          <li class="mb-2"><a href="#" class="text-white text-decoration-none hover-accent">Services</a></li>
          <li class="mb-2"><a href="#" class="text-white text-decoration-none hover-accent">Contact</a></li>
        </ul>
      </BCol>

      <!-- Contact Info -->
      <BCol md="3" class="mb-4 mb-md-0">
        <h5 class="text-uppercase mb-4">Contact Us</h5>
        <ul class="list-unstyled contact-info">
          <li class="mb-2">
            <font-awesome-icon 
              :icon="['fas', 'map-marker-alt']" 
              class="me-2 contact-icon"
            /> 
            Addis Ababa, Ethiopia
          </li>
          <li class="mb-2">
            <font-awesome-icon 
              :icon="['fas', 'envelope']" 
              class="me-2 contact-icon"
            /> 
            info@fanamind.com
          </li>
          <li class="mb-2">
            <font-awesome-icon 
              :icon="['fas', 'phone']" 
              class="me-2 contact-icon"
            /> 
            +251 943 578 915
          </li>
        </ul>
      </BCol>

      <!-- Newsletter -->
      <BCol md="3">
        <h5 class="text-uppercase mb-4">Newsletter</h5>
        <p>Subscribe to our newsletter for updates.</p>
        <BForm class="mt-3">
          <BInputGroup>
            <BFormInput 
              placeholder="Your email" 
              class="bg-secondary border-0 text-white"
            />
            <BButton 
              variant="success" 
              class="px-3 submit-btn"
            >
              <font-awesome-icon 
                :icon="['fas', 'paper-plane']" 
                class="submit-icon"
                beat-fade
              />
            </BButton>
          </BInputGroup>
        </BForm>
      </BCol>
    </BRow>

    <!-- Copyright -->
    <BRow class="mt-4 pt-3 border-top border-secondary">
      <BCol class="text-center">
        <p class="mb-0 text-light">&copy; {{ new Date().getFullYear() }} Fana Mind. All rights reserved.</p>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup>
import {
  BContainer, BRow, BCol, BForm, BFormInput,
  BInputGroup, BButton
} from 'bootstrap-vue-next'
</script>

<style scoped>
.footer {
  background-color: #1a1a1a;
}

/* Social Icons */
.social-icon {
  color: #ffffff;
  transition: all 0.3s ease;
  cursor: pointer;
}

.social-icon:hover {
  color: #20c997 !important;
  transform: translateY(-3px) scale(1.1);
}

/* Contact Icons */
.contact-icon {
  color: #20c997;
  width: 20px;
  transition: all 0.2s ease;
}

.contact-info li:hover .contact-icon {
  transform: scale(1.2);
}

/* Newsletter Submit Button */
.submit-btn {
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background-color: #198754 !important;
  transform: translateX(2px);
}

.submit-icon {
  color: white;
  transition: all 0.3s ease;
}

/* Link Hover Effects */
.hover-accent {
  transition: all 0.2s ease;
}

.hover-accent:hover {
  color: #20c997 !important;
  padding-left: 5px;
  text-decoration: none !important;
}
</style>