<script lang="ts" setup>
const baseNumber = ref(0);

type CurrentNumber = {
  currentNumber: number;
};

const query = gql`
  query currentNumber {
    currentNumber
  }
`;

const subQuery = gql`
  subscription numberIncremented {
    numberIncremented
  }
`;
const { onResult } = useQuery<CurrentNumber>(query);
const { onResult: onSubcriptionResult } = useSubscription(subQuery);

onResult(({ data }) => {
  baseNumber.value = data?.currentNumber;
});

onSubcriptionResult(({ data }) => {
  baseNumber.value = data?.numberIncremented;
});
</script>

<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <ClientOnly>
      <p class="text-9xl font-bold">{{ baseNumber }}</p>
    </ClientOnly>
  </div>
</template>
