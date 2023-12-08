import {mount} from '@vue/test-utils';
import {expect, test} from 'vitest';
import SliderInput from "../src/partials/SliderInput.vue";

test('active class is added when model value is true', async () => {
    const wrapper = mount(SliderInput, {
        props: {
            modelValue: true,
        }
    });

    expect(wrapper.classes()).toContain('active');
    expect(wrapper.classes()).not.toContain('disabled');
});

test('disabled class is added when disabled is true', async () => {
    const wrapper = mount(SliderInput, {
        props: {
            modelValue: true,
            disabled: true,
        }
    });

    expect(wrapper.classes()).toContain('disabled');
});

test('clicking slider emits update', async () => {

    const wrapper = mount(SliderInput, {
        props: {
            modelValue: false,
            disabled: false,
        }
    });

    await wrapper.trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
});

test('clicking disabled slider doesnt do anything', async () => {

    const wrapper = mount(SliderInput, {
        props: {
            modelValue: true,
            disabled: true,
        }
    });

    expect(wrapper.vm.disabled).toBeTruthy();

    await wrapper.trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
});