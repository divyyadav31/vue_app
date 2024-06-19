<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { ref } from 'vue';

const { isLoading, data, error } = useQuery({
  queryKey: ['configData'],
  queryFn: async () => {
    try {
      const response = await fetch('http://localhost:4000/api/config');
      if (!response.ok) throw new Error('Failed to Get Config Data');
      return response.json();
    } catch (error) {
      console.log('Error during data Fetching: ', error);
      return error;
    }
  },
  refetchOnWindowFocus: false,
});
const queryClient = useQueryClient();
const configData = ref('');

const mutation = useMutation({
  mutationFn: async (data: { configData: string }) => {
    try {
      const response = await fetch('http://localhost:4000/api/config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Error in mutation :', error);
      return error;
    }
  },
  onSuccess: async () => {
    try {
      await queryClient.invalidateQueries({ queryKey: ['configData'] });
    } catch (error) {
      console.error('Error refetching queries:', error);
    }
  },
});

let invalid = false;

const jsonValid = (data: string) => {
  try {
    JSON.parse(data);
    return true;
  } catch (e) {
    invalid = true;
    return false;
  }
};

const onSubmit = () => {
  if (!jsonValid(configData.value)) return;
  const data = { configData: configData.value };
  mutation.mutate(data);
  alert(`You submitted the following Data: ${data.configData}`);
};
</script>

<template>
  <h2 v-if="isLoading">Loading...</h2>
  <h2 v-if="error">Oops! An error has occured!</h2>
  <h2 v-if="data">Config Data : {{ JSON.stringify(data) }}</h2>
  <form
    @submit.prevent="onSubmit"
    style="display: flex; flex-direction: column; gap: 10px"
  >
    <textarea
      v-model="configData"
      placeholder="Enter valid json text"
      style="padding: 2em"
    ></textarea>
    <h3 v-if="invalid == true" style="color: red">Invalid json Format</h3>
    <button type="submit">Submit</button>
  </form>
</template>

<style scoped></style>
