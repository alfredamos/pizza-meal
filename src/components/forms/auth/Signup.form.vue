<template>
  <form
    class="bg-white text-slate-800 max-w-lg flex flex-col justify-center items-center mx-auto rounded-xl shadow-2xl py-10 mt-10"
    @submit.prevent="submitForm"
  >
    <h4 class="font-bold text-slate-800 text-2xl mb-6">Edit profile Form</h4>
    <div class="mb-6 w-full px-10">
      <label
        for="name"
        class="flex flex-start w-full font-medium tracking-wide"
      >
        Name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        v-model="signupForm.name"
        class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
      />
    </div>
    <div class="mb-6 w-full px-10">
      <label for="email" class="flex flex-start w-full font-medium">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        v-model="signupForm.email"
        class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
      />
    </div>
    <div class="mb-6 w-full px-10">
      <label for="phone" class="flex flex-start w-full font-medium">
        Phone
      </label>
      <input
        id="phone"
        name="phone"
        type="tel"
        v-model="signupForm.phone"
        class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
      />
    </div>
    <div class="mb-6 w-full px-10">
      <label for="password" class="flex flex-start w-full font-medium">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        v-model="signupForm.password"
        class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
      />
    </div>
    <div class="mb-6 w-full px-10">
      <label for="confirmPassword" class="flex flex-start w-full font-medium">
        Confirm Password
      </label>
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        v-model="signupForm.confirmPassword"
        class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
      />
    </div>
    <div class="mb-6 w-full px-10">
      <label for="image" class="flex flex-start w-full font-medium">
        Image
      </label>
      <input
        id="image"
        name="image"
        type="text"
        v-model="signupForm.image"
        class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
      />
    </div>
    <div class="mb-6 w-full px-10">
      <label for="address" class="flex flex-start w-full font-medium">
        Address
      </label>
      <textarea
        id="address"
        name="address"
        type="text"
        v-model="signupForm.address"
        class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
      ></textarea>
    </div>
    <div class="mb-6 w-full px-10">
      <label for="gender" class="flex flex-start w-full font-medium">
        Gender
      </label>
      <select
        id="gender"
        name="gender"
        v-model="signupForm.gender"
        class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
      >
        <option>Select Gender</option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
      </select>
    </div>
    <div class="flex justify-between w-full px-10">
      <button
        type="submit"
        class="py-2 px-4 border-2 border-indigo-900 hover:bg-indigo-900 hover:text-white text-indigo-900 font-bold text-lg rounded-lg mr-4 w-full"
      >
        Submit
      </button>
      <button
        type="button"
        class="py-2 px-4 border-2 border-yellow-900 hover:bg-yellow-900 hover:text-white text-yellow-900 font-bold text-lg rounded-lg mr-4 w-full"
        @click="backToList"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { SignupModel } from "@/models/auth/signup.model";
import { ref } from "vue";

const signupForm = ref<SignupModel>({ ...new SignupModel() });

const emit = defineEmits(["onBackToList", "onSubmitForm"]);

const backToList = () => {
  emit("onBackToList");
};

const submitForm = () => {
  emit("onSubmitForm", signupForm.value);
};
</script>

<style lang="scss" scoped></style>
