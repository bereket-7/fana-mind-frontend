<template>
    <BNavbar toggleable="lg" variant="success" >

      <BContainer class="d-flex flex-wrap justify-content-center">
        <!-- Brand -->
        <BNavbarBrand href="#" class="text-white me-lg-5">FANA-MIND</BNavbarBrand>
        
        <!-- Toggle -->
        <BNavbarToggle target="nav-collapse" class="border-0"></BNavbarToggle>
  
        <!-- Collapsible Content -->
        <BCollapse id="nav-collapse" is-nav class="flex-grow-1">
          <BNavbarNav class="w-100 justify-content-center align-items-center">
            <!-- Nav Items -->
            <BNavItem href="#" active class="px-3 py-2" variant="light">Home</BNavItem>
            <BNavItem href="#" class="px-3 py-2" variant="light">About</BNavItem>
            <BNavItem href="#" class="px-3 py-2" variant="light">Contact</BNavItem>
        

            <!-- Dropdown -->
        <BDropdown text="Category" variant="link" class="px-3" no-caret>
            <template #button-content>
                <span class="text-white">Category</span>
            </template>
            <BDropdownItem href="#" class="text-white">category one</BDropdownItem>
            <BDropdownItem href="#" class="text-white">category two</BDropdownItem>
        </BDropdown>


            <!-- Search -->
            <div class="px-3">
              <BFormInput
                size="sm"
                class="bg-light text-white border-secondary"
                placeholder="Search"
              ></BFormInput>
            </div>
            
           
          </BNavbarNav>
        </BCollapse>
    <!-- Buttons -->
    <div class="btn-container ms-auto">
        <BButton size="md" variant="outline-light" class="me-3 custom-btn">Login</BButton>
        <BButton size="md" variant="light" class="custom-btn">Sign Up</BButton>
    </div>
    <LogOut />
    </BContainer>
    </BNavbar>
  </template>
  
  <script setup>
  import {
    BNavbar,
    BNavbarBrand,
    BNavbarToggle,
    BNavbarNav,
    BNavItem,
    BDropdown,
    BDropdownItem,
    BCollapse,
    BContainer,
    BFormInput,
    BButton
  } from 'bootstrap-vue-next'
import LogOut from './LogOut.vue';
  </script>
  
  <style scoped>
  .bg-black {
    background-color: #000 !important;
  }
  /* Ensure navbar has consistent height */
.navbar {
  min-height: 56px; /* Bootstrap's default navbar height */
} 

  .nav-link {
    color: white !important;
    padding: 0.5rem 1rem !important;
  }
  .nav-link:hover {
    opacity: 0.8;
  }


/* Enable hover dropdown */
.navbar .dropdown:hover .dropdown-menu {
  display: block;
  margin-top: 0; /* Remove any gap */
}

/* Dropdown menu styling */
.dropdown-menu {
  background-color: #000;
  border: 1px solid #333;
  min-width: 10rem;
}

.dropdown-item {
  color: white !important;
  padding: 0.5rem 1rem;
}

.dropdown-item:hover {
  background-color: #333;
}

/* button styling  */
.btn-container {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0.5rem;
  padding-right: 2.5rem;
}

.custom-btn {
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>