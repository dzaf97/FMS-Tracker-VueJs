<template>
  <div class="trip-card">
    <div class="grid-item-1">
      <div class="trip-title">
        <h4>{{ data.DeliveryOrderNumber }}&nbsp;-&nbsp;</h4>
        <h4 style="color: #15cf79">{{ data.ladenType }}</h4>
      </div>
      <p>From: {{ data.from }}</p>
      <p>To: {{ data.to }}</p>
      <button @click="$emit('on-edit')" type="button">Edit</button>
    </div>
    <div class="grid-item-2">
      <!-- <i style="color: #15cf79" class="fas fa-pencil-alt"></i>&nbsp; -->
      <div class="trip-del">
        <i
          @click="$emit('on-delete')"
          style="color: red"
          class="fa-regular fa-x"
        ></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "trip-card",
  props: {
    data: {
      type: Object,
      description: "Delivery Order",
    },
    ladenType: {
      type: String,
      description: "Laden Type",
    },
    from: {
      type: String,
      description: "From",
    },
    to: {
      type: String,
      description: "Laden Type",
    },
  },
};
</script>
<style>
.trip-del:hover {
  cursor: pointer;
}

.trip-card {
  background-color: white;
  border-radius: 5px;
  margin: 20px;
  padding: 20px 0px 20px 20px;
  display: grid;
  grid-template-columns: 90% 10%;
}

.trip-card button {
  color: white;
  background-color: #15cf79;
  margin: 5px 0px;
  padding: 5px 30px;
  border: none;
  border-radius: 5px;
}

.trip-title {
  text-align: start;
}

.trip-title > h4 {
  color: black;
  font-weight: 600;
  text-align: start;
  padding: 0;
  margin: 0;
  line-height: 1.6em;
  display: inline-block;
}

.trip-card p {
  color: black;
  text-align: start;
  padding: 0;
  margin: 0;
  line-height: 1.6em;
}

.trip-container {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 25px 10px;
  width: 40%;
}

.trip-header {
  display: grid;
  grid-template-columns: 60% 30%;
}

.trip-header {
  display: grid;
  grid-template-columns: 70% 30%;
}

.trip-header button {
  color: white;
  background-color: #15cf79;
  margin: 0px 20px;
  padding: 10px 10px;
  border: none;
  border-radius: 5px;
  align-content: flex-end;
}

.trip-container .trip-header h2 {
  text-decoration: underline;
  text-align: start;
  display: inline;
  margin-bottom: 0%;
  margin-left: 20px;
}
</style>
