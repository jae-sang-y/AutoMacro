const CommandPush_render = (command_push_name) => {
    const command_push_data = this.state.command_push[command_push_name];
    const command_push_onclick = (target) => {
        const command_push_name = get_target_value(target, 'value');
        const command_push_data = this.state.command_push[command_push_name];
        if (command_push_data.enable === false) {
            alert('미구현된 기능입니다.')
            return;
        }
        if (this.state.focused_group_name === null) {
            alert('group을 선택해야 합니다')
            return;
        }
        let groups = this.state.groups;
        groups[this.state.focused_group_name].command_blocks.push(
            CommandBlock.mutation({
                type: command_push_data.type
            })
        );
        this.setState({
            groups: groups,
            dirty_command_area: true,
        });
    }
    const command_push_dragstart = (e) => {
        let command_block = CommandBlock.mutation({
            type: command_push_data.type
        })

        this.setState({
            CommandBlock_holding_id: command_block.id,
            CommandBlock_holding_groupname: null,
            CommandBlock_holding: command_block,
        })
    }
    const command_push_dragend = (e) => {
        this.setState({
            CommandBlock_holding_id: null,
            CommandBlock_holding_groupname: null,
            CommandBlock_holding: null,
            dirty_command_area: true,
        })
    }
    let CommandPush = $(`
                <CommandPush type="button" class="btn btn-outline-primary my-2" value="${command_push_name}"draggable="${this.state.editable && command_push_data.enable ? "true" : "false"}" ">
                    ${command_push_name}
                </CommandPush>
                `)
    CommandPush.addClass(command_push_data.enable ? 'btn-outline-primary' : 'btn-outline-secondary');
    CommandPush.click(command_push_onclick);
    CommandPush.on('dragstart', command_push_dragstart);
    CommandPush.on('dragend', command_push_dragend);
    return CommandPush;
}