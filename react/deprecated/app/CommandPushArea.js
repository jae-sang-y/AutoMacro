import {
    Component
} from './Component.js';

class CommandPush extends Component {

}

export class CommandPushArea extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let self = $('<CommandPushArea class="d-flex flex-column ml-3 overflow-auto"></CommandPushArea>');
        for (const commnad_push_name in this.state.command_push)
            DOM.append(CommandPush_render(commnad_push_name));
        this.state.dirty_command_pusharea = false;
        
        let CommandPush = $(`
        <CommandPush type="button" class="btn btn-outline-primary my-2" value="${command_push_name}"draggable="${this.state.editable && command_push_data.enable ? "true" : "false"}" ">
            ${command_push_name}
        </CommandPush>
        `)
        self.append(CommandPush);
        return self;
    }
}