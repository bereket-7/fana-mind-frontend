<template>
    <BNavbar toggleable="lg" variant="success">
      <BContainer class="d-flex flex-wrap justify-content-center">
        <!-- Brand -->
        <BNavbarBrand href="#" class="text-white me-lg-5">My Vue App</BNavbarBrand>
        
        <!-- Toggle -->
        <BNavbarToggle target="nav-collapse" class="border-0"></BNavbarToggle>
  
        <!-- Collapsible Content -->
        <BCollapse id="nav-collapse" is-nav class="flex-grow-1">
          <BNavbarNav class="w-100 justify-content-center align-items-center">
            <!-- Nav Items -->
            <BNavItem href="#" active class="px-3 py-2" variant="light">Home</BNavItem>
            <BNavItem href="#" class="px-3 py-2" variant="light">About</BNavItem>
            
            <!-- Dropdown -->
            <BDropdown text="Menu" variant="link" class="px-3 text-decoration-none" no-caret>
              <template #button-content>
                <span class="text-white">Dropdown</span>
              </template>
              <BDropdownItem href="#">Action 1</BDropdownItem>
              <BDropdownItem href="#">Action 2</BDropdownItem>
            </BDropdown>
  
            <!-- Search -->
            <div class="px-3">
              <BFormInput
                size="sm"
                class="bg-dark text-white border-secondary"
                placeholder="Search"
              ></BFormInput>
            </div>
            
            <!-- Login Button -->
            <BButton size="sm" variant="outline-light" class="ms-lg-3">Login</BButton>
          </BNavbarNav>
        </BCollapse>
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
  </script>
  
  <style scoped>
  .bg-black {
    background-color: #000 !important;
  }
  .nav-link {
    color: white !important;
    padding: 0.5rem 1rem !important;
  }
  .nav-link:hover {
    opacity: 0.8;
  }
  </style>