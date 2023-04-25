<script>
export default {
    props: {
        modelValue: { type: String, default: "" },
    },
    emits: ["submit", "update:modelValue"],
    methods: {
        updateModelValue(e) {
            this.$emit("update:modelValue", e.target.value);
        },
        submit() {
            this.$emit("submit");
        },
    },
};
</script>
<template>
    <div class="input-group">
        <input type="text" class="form-control search-input" placeholder="Type your keyword" :value="modelValue"
            @input="updateModelValue" @keyup.enter="submit" />
        <div class="input-group-append">
            <button class="btn btn-outline-secondary search-btn" type="button" @click="submit">
                <i class="fas fa-search"></i> Search
            </button>
        </div>
    </div>
</template>

<style>
.search-input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.search-btn {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
}
</style>