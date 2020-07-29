const Group_render = (group_name, group_data) => {
    const group_onclick = (target) => {
        this.setState({
            focused_group_name: get_target_value(target, 'value'),
            dirty_command_area: true,
        });
    }

    let group = $(`
            <Group class="card p-2 mb-2" value="${group_name}"></Group>`).append($(
            '<h5 class="d-flex align-items-center"></h5>').append(icon_braces).append(
            `그룹 ${group_name}</h5>`))
        .append($(`<List class="d-flex flex-column"></List>`))

    if (group_name === this.state.focused_group_name)
        group.addClass('border-primary')
        .addClass('text-primary');
    else
        group.click(group_onclick);
    let line_number = 1;
    for (const command_block of group_data.command_blocks)
        group.find('List').append(CommandBlock.render(command_block, group_name, line_number++));

    return group;
};