<script setup lang="ts">
const query = gql`
  query Users {
    users {
      id
      username
      email
    }
  }
`;
const { data } = await useAsyncQuery(query);
</script>

<template>
  <div class="max-w-7xl mx-auto p-10">
    <!-- <div class="md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Users</h2>
      </div>
      <div class="mt-4 flex md:mt-0 md:ml-4">
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-50"
        >
          Add User
        </button>
      </div>
    </div> -->
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold text-gray-900">Users</h1>
          <p class="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add user
          </button>
        </div>
      </div>
      <div class="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
              <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                Title
              </th>
              <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                Email
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
              <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="user in data.users" :key="user.id">
              <td
                class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6"
              >
                {{ user.username }}
                <dl class="font-normal lg:hidden">
                  <dt class="sr-only">Title</dt>
                  <dd class="mt-1 truncate text-gray-700">{{ user?.title }}</dd>
                  <dt class="sr-only sm:hidden">Email</dt>
                  <dd class="mt-1 truncate text-gray-500 sm:hidden">{{ user.email }}</dd>
                </dl>
              </td>
              <td class="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{{ user?.title }}</td>
              <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{{ user.email }}</td>
              <td class="px-3 py-4 text-sm text-gray-500">{{ user?.role }}</td>
              <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <a href="#" class="text-indigo-600 hover:text-indigo-900"
                  >Edit<span class="sr-only">, {{ user.username }}</span></a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
