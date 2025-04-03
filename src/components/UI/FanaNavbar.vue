<template>
    <BNavbar toggleable="lg" type="dark" variant="primary">
      <BContainer>
        <!-- Brand/Logo -->
        <BNavbarBrand href="#" variant="">My Vue App</BNavbarBrand>
  
        <!-- Mobile Toggle Button -->
        <BNavbarToggle target="nav-collapse"></BNavbarToggle>
  
        <!-- Collapsible Content -->
        <BCollapse id="nav-collapse" is-nav>
          <!-- Left Aligned Items -->
          <BNavbarNav>
            <BNavItem href="#" active>Home</BNavItem>
            <BNavItem href="#">About</BNavItem>
            <BDropdown text="Dropdown" variant="link" no-caret>
              <BDropdownItem href="#">Action 1</BDropdownItem>
              <BDropdownItem href="#">Action 2</BDropdownItem>
            </BDropdown>
          </BNavbarNav>
  
          <!-- Right Aligned Items -->
          <BNavbarNav class="ms-auto">
            <BFormInput
              size="sm"
              class="me-2 my-2"
              placeholder="Search"
            ></BFormInput>
            <BButton size="sm" variant="light" class="my-2">Login</BButton>
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