<template>
  <div class="about">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-8 text-center">
          <h1 class="display-4 fw-bold mb-4">About Fana Mind</h1>
          <p class="lead mb-5">
            We're revolutionizing online education with cutting-edge technology and innovative learning approaches.
          </p>
        </div>
      </div>

      <div class="row g-5 align-items-center mb-5">
        <div class="col-lg-6">
          <h2 class="fw-bold mb-4">Our Mission</h2>
          <p class="mb-4">
            At Fana Mind, we believe that quality education should be accessible to everyone, everywhere. 
            Our mission is to democratize learning by providing an advanced, AI-powered learning management 
            system that adapts to each learner's unique needs and pace.
          </p>
          <p class="mb-4">
            We combine the latest in educational technology with proven pedagogical methods to create 
            an engaging, effective, and personalized learning experience.
          </p>
        </div>
        <div class="col-lg-6 text-center">
          <font-awesome-icon :icon="['fas', 'lightbulb']" class="about-icon text-primary" />
        </div>
      </div>

      <div class="row g-5 align-items-center mb-5">
        <div class="col-lg-6 text-center order-lg-2">
          <font-awesome-icon :icon="['fas', 'rocket']" class="about-icon text-success" />
        </div>
        <div class="col-lg-6 order-lg-1">
          <h2 class="fw-bold mb-4">Our Vision</h2>
          <p class="mb-4">
            We envision a world where learning is limitless, where geographical boundaries don't 
            restrict access to quality education, and where technology enhances rather than replaces 
            human connection in the learning process.
          </p>
          <p class="mb-4">
            Through continuous innovation and a commitment to excellence, we're building the future 
            of education—one learner at a time.
          </p>
        </div>
      </div>

      <!-- Team Section -->
      <div class="row text-center mb-5">
        <div class="col-12">
          <h2 class="display-5 fw-bold mb-5">Our Values</h2>
        </div>
      </div>

      <div class="row g-4 mb-5">
        <div class="col-md-4">
          <BCard class="value-card h-100 text-center border-0 shadow-sm">
            <BCardBody class="p-4">
              <div class="value-icon bg-primary text-white rounded-circle mx-auto mb-3">
                <font-awesome-icon :icon="['fas', 'heart']" />
              </div>
              <h5 class="fw-bold mb-3">Accessibility</h5>
              <p class="text-muted">
                Making quality education accessible to learners of all backgrounds and abilities.
              </p>
            </BCardBody>
          </BCard>
        </div>
        
        <div class="col-md-4">
          <BCard class="value-card h-100 text-center border-0 shadow-sm">
            <BCardBody class="p-4">
              <div class="value-icon bg-success text-white rounded-circle mx-auto mb-3">
                <font-awesome-icon :icon="['fas', 'cogs']" />
              </div>
              <h5 class="fw-bold mb-3">Innovation</h5>
              <p class="text-muted">
                Continuously pushing the boundaries of educational technology and methodology.
              </p>
            </BCardBody>
          </BCard>
        </div>
        
        <div class="col-md-4">
          <BCard class="value-card h-100 text-center border-0 shadow-sm">
            <BCardBody class="p-4">
              <div class="value-icon bg-info text-white rounded-circle mx-auto mb-3">
                <font-awesome-icon :icon="['fas', 'handshake']" />
              </div>
              <h5 class="fw-bold mb-3">Community</h5>
              <p class="text-muted">
                Building strong learning communities that support and inspire each other.
              </p>
            </BCardBody>
          </BCard>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="row justify-content-center">
        <div class="col-lg-8 text-center">
          <div class="contact-section bg-light rounded-3 p-5">
            <h3 class="fw-bold mb-3">Get in Touch</h3>
            <p class="mb-4">
              Have questions about Fana Mind? We'd love to hear from you!
            </p>
            <div class="d-flex justify-content-center gap-3 flex-wrap">
              <BButton variant="primary">
                <font-awesome-icon :icon="['fas', 'envelope']" class="me-2" />
                Contact Us
              </BButton>
              <BButton variant="outline-primary">
                <font-awesome-icon :icon="['fab', 'github']" class="me-2" />
                GitHub
              </BButton>
              <BButton variant="outline-primary">
                <font-awesome-icon :icon="['fab', 'twitter']" class="me-2" />
                Twitter
              </BButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// About page component
</script>

<style scoped>
.about-icon {
  font-size: 6rem;
  opacity: 0.8;
}

.value-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15) !important;
}

.value-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.contact-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

@media (max-width: 768px) {
  .about-icon {
    font-size: 4rem;
  }
  
  .display-4 {
    font-size: 2.5rem;
  }
}
</style>
