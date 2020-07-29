
/*import {
    command_types,
    able_key_list,
    able_mouse_button_list
} from './common.js'
import {
    icon_braces,
    icon_load,
    icon_save,
    icon_stop,
    icon_triangle_right
} from './Icons.js'
import {
    Component
} from './Component.js';

import {
    CommandPushArea
} from './CommandPushArea.js';


class Main extends Component {

    constructor() {
        super()
        this.state = {
            run: null,
            editable: true,
            mouse_pos: {
                x: -1,
                y: -1,
            },
            groups: {
                '메인': {
                    command_blocks: [{
                        id: Math.random(),
                        type: command_types.delay,
                        second: 1,
                    }],
                },
                '서브루틴': {
                    command_blocks: [{
                        id: Math.random(),
                        type: command_types.delay,
                        second: 1,
                    }],
                }
            },
            focused_group_name: null,
        };


        this.CommandPushArea = new CommandPushArea($('CommandPushArea'));
    }

    async loop() {
        //if (this.tick % 5 == 0) await this.update_mouse_pos();
    }

    render() {
        return $(`
        <div class="m-auto container px-3 border shadow"
            <h1 class="text-center my-3">
                
            </h1>
            <div class="d-flex mb-3">
                ${CommandArea}                
                <RightPanel>
                    <ControlArea class="d-flex flex-column ml-3 overflow-auto">
                    </ControlArea>
                    <StatusArea class="d-flex flex-column ml-3 overflow-auto">
                    </StatusArea>
                    <CommandPushArea class="d-flex flex-column ml-3 overflow-auto">
                    </CommandPushArea>
                </RightPanel>
            </div>
    
        </div>
        `)

        /*if (this.state.dirty_command_area) {
            const CommandArea = $('CommandArea');
            CommandArea.empty();
            for (const group_name in this.state.groups) {
                CommandArea.append(Group_render(group_name, this.state.groups[group_name]));
            }
            this.state.dirty_command_area = false;
        }

        if (this.state.dirty_command_pusharea) {
            const CommandPushArea = $('CommandPushArea');
            CommandPushArea.empty();
            for (const commnad_push_name in this.state.command_push)
                CommandPushArea.append(CommandPush_render(commnad_push_name));
            this.state.dirty_command_pusharea = false;
        }

        if (this.state.dirty_status_area) {
            const StatusArea = $('StatusArea');
            StatusArea.html(`
                    <div class="btn-group my-2">
                        <pre class="btn border-secondary text-muted disabled m-0" >x = ${('      ' + this.state.mouse_pos.x).slice(-5)}</pre>
                        <pre class="btn border-secondary text-muted disabled m-0" >y = ${('      ' + this.state.mouse_pos.y).slice(-5)}</pre>
                    </div>`);
            this.state.dirty_status_area = false;
        }

        if (this.state.dirty_control_area) {
            const ControlArea = $('ControlArea');
            ControlArea.empty();
            ControlArea.append(
                $(`<div class="btn-group my-0"></div>`)
                .append($(
                    `<label class="btn border-secondary text-muted m-0 d-flex justify-content-center align-items-center"></label>`
                ).append(
                    this.state.run == null ? icon_triangle_right() : icon_stop()).on('click', this.state.run ==
                    null ? control_run : control_stop))
                .append($(
                    `<label class="btn border-secondary text-muted m-0 d-flex justify-content-center align-items-center"></label>`
                ).append(
                    icon_load()).on('click', control_load))
                .append($(
                    `<label class="btn border-secondary text-muted m-0 d-flex justify-content-center align-items-center"></label>`
                ).append(
                    icon_save()).on('click', control_save))
            )
            this.state.dirty_control_area = false;
        }
    };

    async update_mouse_pos() {
        const result = await fetch('/get_mouse_pos');
        if (!result.ok) return;
        const data = await result.json();

        this.setState({
            mouse_pos: {
                x: data.x,
                y: data.y
            },
            dirty_status_area: true
        })
    }

    get_target_value(target, key) {
        return target.currentTarget.attributes[key].textContent;
    }

    get_value(obj, key) {
        return obj.attributes[key].textContent;
    }

    control_load() {

    }

    control_save() {

    }

    control_run() {
        this.setState({
            editable: false,
            run: {},
            dirty_command_area: true,
            dirty_command_pusharea: true,
            dirty_control_area: true,
        })
    }

    control_stop() {
        this.setState({
            editable: true,
            run: null,
            dirty_command_area: true,
            dirty_command_pusharea: true,
            dirty_control_area: true,
        })
    }
}

*/

// $(document).ready(async () => {
//     const main = new Main();
//     setTimeout(
//         async () => {
//             $(document.body).html(await main.run());
//         }, 33
//     )
// });