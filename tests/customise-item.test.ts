import {mount} from '@vue/test-utils';
import {expect, test} from 'vitest';
import CustomiseItem from "../src/partials/CustomiseItem.vue";
import {ref} from "vue";

const modelValue = ref(false)

const wrapper = mount(CustomiseItem, {
    props: {
        modelValue: modelValue.value,
        type: 'functionality',
        settings: {
            functionality: {
                // title: 'Custom Title',
                description: 'Custom Description',
                cookies: [
                    {
                        name: 'Cookie 1',
                        description: 'Cookie 1 Description',
                        expires: '2 hours',
                    }
                ]
            }
        }
    }
});

test('label is automatically calculated', async () => {

    const label = await wrapper.find('li label');

    expect(label.text()).toBe('Functionality cookies');
});

test('label can be customised', async () => {
    await wrapper.setProps({
        settings: {
            functionality: {
                title: 'Custom Title',
            }
        }
    });

    const label = await wrapper.find('li label');

    expect(label.text()).toBe('Custom Title');
});

test('description is hidden if not set', async () => {
    await wrapper.setProps({
        settings: {
            functionality: {
                //
            }
        }
    });

    const description = await wrapper.find('[data-test=description]');

    expect(description.exists()).toBe(false);
});

test('description is output if set', async () => {

    const descriptionValue = 'A test description'
    await wrapper.setProps({
        settings: {
            functionality: {
                description: descriptionValue
            }
        }
    });

    const description = await wrapper.find('[data-test=description]');

    expect(description.text()).toBe(descriptionValue);
})

test('more details button is hidden if cookies exist', async () => {
    await wrapper.setProps({
        settings: {
            functionality: {
                //
            }
        }
    });

    const detailsBtn = await wrapper.find('[data-test=details-btn]');

    expect(detailsBtn.exists()).toBe(false);
});

test('more details button is displayed if cookies exist', async () => {
    await wrapper.setProps({
        settings: {
            functionality: {
                cookies: [
                    {
                        name: 'Cookie 1',
                    }
                ]
            }
        }
    });

    expect(wrapper.find('[data-test=details-btn]').exists()).toBe(true);
});

test('cookies are shown when more details is clicked', async () => {

    await wrapper.setProps({
        settings: {
            functionality: {
                cookies: [
                    {
                        name: 'Cookie 1',
                    }
                ]
            }
        }
    });

    expect(wrapper.vm.moreDetails).toBe(false);

    // click our button
    await wrapper.find('[data-test=details-btn]').trigger('click');

    expect(wrapper.vm.moreDetails).toBe(true);

    expect(wrapper.find('ul li strong').text()).toBe('Cookie 1');
})