<template>
  <template v-if="isObject(jsonValue)">
    <span :class="theme.scopeElementClass">{</span>
    <template v-for="(value, key, index) in jsonValue">
      <div>
        <p>
          <span v-html="indentationTabs" />
          <span :class="theme.propertyClass">"{{ key }}"</span>
          <span :class="theme.propertyDefinerClass">: </span>
          <JsonValue
            :jsonValue="value"
            :depth="nextDepth"
            :isLastValue="index === Object.keys(jsonValue).length - 1"
          />
        </p>
      </div>
    </template>
    <span v-html="previousIndentationTabs" />
    <span :class="theme.scopeElementClass">}</span>
  </template>

  <template v-else-if="Array.isArray(jsonValue)">
    <span :class="theme.scopeElementClass">[</span>
    <br />
    <template v-for="(value, index) in jsonValue">
      <span v-html="indentationTabs" />
      <JsonValue
        :jsonValue="value"
        :depth="nextDepth"
        :isLastValue="index === jsonValue.length - 1"
      />
      <br />
    </template>
    <span v-html="previousIndentationTabs" />
    <span :class="theme.scopeElementClass">]</span>
  </template>

  <template v-else>
    <template v-if="isString(jsonValue)">
      <span :class="theme.stringValueClass">"{{ jsonValue }}"</span>
    </template>
    <template v-else-if="isNumber(jsonValue)">
      <span :class="theme.numberValueClass">{{ jsonValue }}</span>
    </template>
    <template v-else-if="isBoolean(jsonValue)">
      <span :class="theme.booleanValueClass">{{ jsonValue }}</span>
    </template>
    <template v-else-if="jsonValue === null">
      <span :class="theme.nullValueClass">null</span>
    </template>
  </template>

  <!--Only print a comma if the value isn't the last in scope-->
  <template v-if="!isLastValue">
    <span :class="theme.propertySeparatorClass">,</span>
  </template>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import JsonValue from '@/components/JsonValue.vue';

const isString = (x: unknown): x is string => typeof x === 'string';
const isNumber = (x: unknown): x is number => typeof x === 'number';
const isBoolean = (x: unknown): x is boolean => typeof x === 'boolean';
const isObject = (x: unknown): x is Record<string, unknown> =>
  typeof x === 'object' && x !== null && !Array.isArray(x);

const props = withDefaults(
  defineProps<{
    jsonValue: any;
    depth?: number;
    isLastValue?: boolean;
  }>(),
  {
    depth: 0,
    isLastValue: true,
  },
);

const theme = {
  scopeElementClass: 'text-green-500',
  propertyClass: 'text-blue-500',
  propertyDefinerClass: 'text-purple-500',
  stringValueClass: 'text-green-500',
  numberValueClass: 'text-red-500',
  booleanValueClass: 'text-pink-500',
  nullValueClass: 'text-gray-500',
  propertySeparatorClass: 'text-black',
  indentationSpaces: 2,
};

const nextDepth = ref(props.depth + 1);
const tab = '&nbsp;'.repeat(theme.indentationSpaces);

// Get the amount of tabs for the current depth
const getIndentationTabs = (extraTabs = 0) => tab.repeat(nextDepth.value + extraTabs);
const indentationTabs = getIndentationTabs();
const previousIndentationTabs = getIndentationTabs(-1);
</script>
