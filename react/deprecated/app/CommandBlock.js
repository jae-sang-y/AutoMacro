const CommandBlock = {
    mutation: (data, dom = null) => {
        data.id = data.id || Math.random()
        if (data.type == command_types.keydown) {
            data.key = data.key || Object.keys(able_key_list)[0]
        } else if (data.type == command_types.keyup) {
            data.key = data.key || Object.keys(able_key_list)[0]
        } else if (data.type == command_types.mouse_click) {
            data.button = data.button || Object.keys(able_mouse_button_list)[0]
        } else if (data.type == command_types.delay) {
            data.second = data.second || 1.0
        }
        return data;
    },
    render: (command_block, group_name, line_number) => {
        if (command_block == null) return;

        let CB_dom = $(
            `<CommandBlock class="border mt-2 form-inline py-2 d-flex" draggable="${this.state.editable ? "true" : "false"}" group_name="${group_name}" value="${command_block.id}"> </CommandBlock>`
        );

        if (this.state.run != null && group_name === this.state.run.group_name && line_number === this.state.run
            .line_number)
            CB_dom.append(icon_triangle_right)
        else
            CB_dom.append($(
                `<label class="mx-1 font-weight-bold text-muted" solid>${line_number}</label>`));

        CB_dom.on('click', (e) => {
            e.preventDefault();
        });
        CB_dom.on('dragstart', (e) => {
            this.setState({
                CommandBlock_holding_id: get_target_value(e, 'value'),
                CommandBlock_holding_groupname: get_target_value(e, 'group_name'),
                CommandBlock_holding: Object.assign({}, this.state.groups[
                    get_target_value(e, 'group_name')].command_blocks.find(o =>
                    o.id == get_target_value(e, 'value'))),
                dirty_command_area: true,
            })
            let groups = Object.assign({}, this.state.groups);
            groups[this.state.CommandBlock_holding_groupname].command_blocks = groups[
                this.state.CommandBlock_holding_groupname].command_blocks.filter(
                o => o.id != this.state.CommandBlock_holding_id
            );

            this.setState({
                groups: groups,
                dirty_command_area: true,
            })
        });
        CB_dom.on('dragover', (e) => {
            if (e.target.tagName !== 'COMMANDBLOCK' && e.target.tagName == 'COMMANDPUSH') return;
            const taregt_group_name = get_target_value(e, 'group_name');
            const target_id = get_target_value(e, 'value');

            if (this.state.CommandBlock_holding_id == target_id && this.state
                .CommandBlock_holding_groupname ==
                taregt_group_name) {
                return;
            }

            let groups = Object.assign({}, this.state.groups);
            let target_index = groups[taregt_group_name].command_blocks.findIndex(o => o.id ==
                target_id);
            if (this.state.CommandBlock_holding_groupname != null)
                groups[this.state.CommandBlock_holding_groupname].command_blocks = groups[
                    this.state.CommandBlock_holding_groupname].command_blocks.filter(
                    o => o.id != this.state.CommandBlock_holding_id
                );
            groups[taregt_group_name].command_blocks.splice(target_index, 0, this.state
                .CommandBlock_holding);
            this.setState({
                groups: groups,
                CommandBlock_holding_groupname: taregt_group_name,
                dirty_command_area: true,
            })
            e.preventDefault();
        });
        CB_dom.on('dragend', (e) => {
            console.log('dragend');
            this.setState({
                CommandBlock_holding_id: null,
                CommandBlock_holding_groupname: null,
                CommandBlock_holding: null,
                dirty_command_area: true,
            })
        });

        if (command_block.type == command_types.keydown) {
            CB_dom.append($('<label class="text-dark">키 다운</label>'))
            CB_dom.append(select_able_key_list(command_block.key).attr(this.state.editable ? {} : {
                'readonly': '',
                'disabled': ''
            }).addClass('ml-auto').on(
                'change',
                (e) => {
                    const taregt_group_name = get_value(e.currentTarget.parentNode,
                        'group_name');
                    const target_id = get_value(e.currentTarget.parentNode, 'value');

                    let groups = Object.assign({}, this.state.groups);
                    let command_block = groups[taregt_group_name].command_blocks.find(o => o
                        .id == target_id);
                    command_block.key = e.currentTarget.value;
                    this.setState({
                        groups: groups,
                        dirty_command_area: true,
                    });
                }
            ));
        } else if (command_block.type == command_types.keyup) {
            CB_dom.append($('<label class="text-dark">키 업</label>'))
            CB_dom.append(select_able_key_list(command_block.key).attr(this.state.editable ? {} : {
                'readonly': '',
                'disabled': ''
            }).addClass(this.state.editable ? null : 'disabled').addClass('ml-auto').on(
                'change',
                (e) => {
                    const taregt_group_name = get_value(e.currentTarget.parentNode,
                        'group_name');
                    const target_id = get_value(e.currentTarget.parentNode, 'value');

                    let groups = Object.assign({}, this.state.groups);
                    let command_block = groups[taregt_group_name].command_blocks.find(o => o
                        .id == target_id);
                    command_block.key = e.currentTarget.value;
                    this.setState({
                        groups: groups,
                        dirty_command_area: true,
                    });
                }
            ));
        } else if (command_block.type == command_types.mouse_click) {
            CB_dom.append($('<label class="text-dark">마우스 클릭</label>'))
            CB_dom.append(select_able_mouse_button_list(command_block.button).attr(this.state.editable ? {} : {
                'readonly': '',
                'disabled': ''
            }).addClass(this.state.editable ? null : 'disabled').addClass('ml-auto').on(
                'change',
                (e) => {
                    const taregt_group_name = get_value(e.currentTarget.parentNode,
                        'group_name');
                    const target_id = get_value(e.currentTarget.parentNode, 'value');

                    let groups = Object.assign({}, this.state.groups);
                    let command_block = groups[taregt_group_name].command_blocks.find(o => o
                        .id == target_id);
                    command_block.button = e.currentTarget.value;
                    this.setState({
                        groups: groups,
                        dirty_command_area: true,
                    });
                }
            ));
        } else if (command_block.type == command_types.delay) {
            CB_dom.append($(
                `<input type="number" class="form-control" step="0.001" value="${command_block.second}">`
            ).attr(this.state.editable ? {} : {
                'readonly': '',
                'disabled': ''
            }).on(
                'change', (e) => {
                    const taregt_group_name = get_value(e.currentTarget.parentNode,
                        'group_name');
                    const target_id = get_value(e.currentTarget.parentNode, 'value');

                    let groups = Object.assign({}, this.state.groups);
                    let command_block = groups[taregt_group_name].command_blocks.find(o => o
                        .id == target_id);
                    command_block.second = e.currentTarget.value;
                    this.setState({
                        groups: groups,
                        dirty_command_area: true,
                    });
                }).addClass(this.state.editable ? null : 'disabled'));
            CB_dom.append($('<label class="text-dark">초 지연하기</label>'))
        } else {
            CB_dom.append($(`<label class="text-dark">알 수 없는 명령어 [${command_block.type}]</label>`))
        }

        return CB_dom
    },
};