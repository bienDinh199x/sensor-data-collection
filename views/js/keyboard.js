function keyboard(x) {
  $(`#${x}`)
    .keyboard({
      alwaysOpen: true, // luôn hiện bàn phím
      autoAccept: true, // tự dộng accept text
      usePreview: false,
      layout: 'custom',
      customLayout: {
        'normal': [
          '1 2 3 4 5 6 7 8 9 0 {del} {b}',
          'q w e r t y u i o p',
          '{shift} a s d f g h j k l {shift}',
          'z x c v b n m {space} {left} {right}'
        ],
        'shift': [
          '1 2 3 4 5 6 7 8 9 0 {del} {b}',
          'Q W E R T Y U I O P',
          '{shift} A S D F G H J K L {shift}',
          'Z X C V B N M {space} {left} {right}'
        ]
      },
    })
    //   .keyboard({
    //   alwaysOpen: true, // luôn hiện bàn phím
    //   autoAccept: true, // tự dộng accept text
    //   usePreview: false,
    //   layout: 'custom',
    //   customLayout: {
    //     'normal': [
    //       '` 1 2 3 4 5 6 7 8 9 0 - = {del} {b}',
    //       '{tab} q w e r t y u i o p [ ] \\',
    //       'a s d f g h j k l ; \' {enter}',
    //       '{shift} z x c v b n m , . / {shift}',
    //       '{space} {left} {right} {undo:Undo} {redo:Redo}'
    //     ],
    //     'shift': [
    //       '~ ! @ # $ % ^ & * ( ) _ + {del} {b}',
    //       '{tab} Q W E R T Y U I O P { } |',
    //       'A S D F G H J K L : " {enter}',
    //       '{shift} Z X C V B N M < > ? {shift}',
    //       '{space} {left} {right} {undo:Undo} {redo:Redo}'
    //     ]
    //   },
    // })
    .addNavigation({
      position: [0, 0], // set start position [row-number, key-index]
      toggleMode: true, // true = navigate the virtual keyboard, false = navigate in input/textarea
      focusClass: 'hasFocus' // css class added when toggle mode is on
    })
}
function keyboard_number(x) {
  $(`#${x}`)
    .keyboard({
      alwaysOpen: true, // luôn hiện bàn phím
      autoAccept: true, // tự dộng accept text
      usePreview: false,
      layout: 'custom',
      customLayout: {
        'normal': [
          '1 2 3',
          '4 5 6',
          '7 8 9',
          '{left} {b} 0 {del} {right}',
        ]
      },
    })
    .addNavigation({
      position: [0, 0], // set start position [row-number, key-index]
      toggleMode: true, // true = navigate the virtual keyboard, false = navigate in input/textarea
      focusClass: 'hasFocus' // css class added when toggle mode is on
    })
}


function inputClick(x) { // Bắt sự kiện click vào input để đưa ra bàn phím tương ứng
  console.info(`inputClick()`)
  $('.ui-keyboard').hide()
  show_vitual_key(x)
  check_id = x
  input_swich = x
  switch_input()
}
// function inputFocus(_x) { // Bắt sự kiện focus vào input để đưa ra bàn phím tương ứng

// }
function button_click(x) { // bắt sự kiện nút điều hướng bàn phím ảo
  $(`#${check_id}`).trigger('navigate', x)
}
function button_input_swich() { // chuyển giữa các input
  console.info(`button_input_swich()`)
  $('.ui-keyboard').hide()
  show_vitual_key(input_swich)
  $(`#${input_swich}`).focus()
  var tmpStr = $(`#${input_swich}`).val();
  $(`#${input_swich}`).val(tmpStr);
  check_id = input_swich

  switch_input(input_swich)
}

function switch_input() {
  console.info(`switch_input()`)
  $(`input`).css({ border: '2px solid #303030' })
  $(`select`).css({ border: '2px solid #303030' })
  $(`.switch`).css({ border: '02px solid #303030' })
  $(`.add_edit_audio_radio`).css({ border: '2px solid #303030' })
  $(`#${input_swich}`).css({ border: '2px solid red' })
  switch (input_swich) {
    // change pass
    case `old_pass`: input_swich = `new_pass`; break;
    case `new_pass`: input_swich = `re_pass`; break;
    case `re_pass`: input_swich = `old_pass`; break;
    // change ip
    case `edit_ip`: input_swich = `edit_name`; break;
    case `edit_name`: input_swich = `edit_ip`; break;

    // Lang
    case `add_lang_key`: input_swich = `add_lang_vi`; break;
    case `add_lang_vi`: input_swich = `add_lang_en`; break;
    case `add_lang_en`: input_swich = `add_lang_ja`; break;
    case `add_lang_ja`: input_swich = `add_lang_key`; break;

    case `edit_lang_vi`: input_swich = `edit_lang_en`; break;
    case `edit_lang_en`: input_swich = `edit_lang_ja`; break;
    case `edit_lang_ja`: input_swich = `edit_lang_vi`; break;

    // NAC
    case `add_nac_id`: input_swich = `add_nac_name`; break;
    case `add_nac_name`: input_swich = `add_nac_output_name1`; break;
    case `add_nac_output_name1`: input_swich = `add_nac_output_name2`; break;
    case `add_nac_output_name2`: input_swich = `add_nac_enable`; break;
    case `add_nac_enable`: input_swich = `add_nac_id`; break;

    case `edit_nac_id`: input_swich = `edit_nac_name`; break;
    case `edit_nac_name`: input_swich = `edit_nac_output_name1`; break;
    case `edit_nac_output_name1`: input_swich = `edit_nac_output_name2`; break;
    case `edit_nac_output_name2`: input_swich = `edit_nac_enable`; break;
    case `edit_nac_enable`: input_swich = `edit_nac_id`; break;


    // FACP
    case `add_facp_id`: input_swich = `add_facp_name`; break;
    case `add_facp_name`: input_swich = `add_facp_read_dte`; break;
    case `add_facp_read_dte`: input_swich = `add_facp_enable`; break;
    case `add_facp_enable`: input_swich = `add_facp_id`; break;

    case `edit_facp_id`: input_swich = `edit_facp_name`; break;
    case `edit_facp_name`: input_swich = `edit_facp_read_dte`; break;
    case `edit_facp_read_dte`: input_swich = `edit_facp_enable`; break;
    case `edit_facp_enable`: input_swich = `edit_facp_id`; break;


    // IO
    case `add_io_id`: input_swich = `add_io_name`; break;
    case `add_io_name`: input_swich = `add_io_input_name1`; break;
    case `add_io_input_name1`: input_swich = `add_io_input_name2`; break;
    case `add_io_input_name2`: input_swich = `add_io_input_name3`; break;
    case `add_io_input_name3`: input_swich = `add_io_input_name4`; break;
    case `add_io_input_name4`: input_swich = `add_io_output_name1`; break;
    case `add_io_output_name1`: input_swich = `add_io_output_name2`; break;
    case `add_io_output_name2`: input_swich = `add_io_output_name3`; break;
    case `add_io_output_name3`: input_swich = `add_io_output_name4`; break;
    case `add_io_output_name4`: input_swich = `add_io_enable`; break;
    case `add_io_enable`: input_swich = `add_io_id`; break;

    case `edit_io_id`: input_swich = `edit_io_name`; break;
    case `edit_io_name`: input_swich = `edit_io_input_name1`; break;
    case `edit_io_input_name1`: input_swich = `edit_io_input_name2`; break;
    case `edit_io_input_name2`: input_swich = `edit_io_input_name3`; break;
    case `edit_io_input_name3`: input_swich = `edit_io_input_name4`; break;
    case `edit_io_input_name4`: input_swich = `edit_io_output_name1`; break;
    case `edit_io_output_name1`: input_swich = `edit_io_output_name2`; break;
    case `edit_io_output_name2`: input_swich = `edit_io_output_name3`; break;
    case `edit_io_output_name3`: input_swich = `edit_io_output_name4`; break;
    case `edit_io_output_name4`: input_swich = `edit_io_enable`; break;
    case `edit_io_enable`: input_swich = `edit_io_id`; break;

    // Zone
    case `add_zone_name`: input_swich = `add_zone_nac_io`; break;
    case `add_zone_nac_io`:
      input_swich = `add_zone_audio`
      $('#button7 table tr').html(`<td onclick="popupListNacIoOutput('add_zone_nac_io')"><i class="fas fa-hand-pointer"></i></td>`)
      break;
    case `add_zone_audio`:
      input_swich = `add_zone_dte_limit_4`
      $('#button7 table tr').html(`<td onclick="popupListAudio('add_zone_audio')"><i class="fas fa-hand-pointer"></i></td>`)
      break;
    case `add_zone_dte_limit_4`: input_swich = `add_zone_dte_limit_5`; break;
    case `add_zone_dte_limit_5`: input_swich = `add_zone_name`; break;


    case `edit_zone_name`: input_swich = `edit_zone_nac_io`; break;
    case `edit_zone_nac_io`:
      input_swich = `edit_zone_audio`
      $('#button7 table tr').html(`<td onclick="popupListNacIoOutput('edit_zone_nac_io')"><i class="fas fa-hand-pointer"></i></td>`)
      break;
    case `edit_zone_audio`:
      input_swich = `edit_zone_parent`
      $('#button7 table tr').html(`<td onclick="popupListAudio('edit_zone_audio')"><i class="fas fa-hand-pointer"></i></td>`)
      break;
    case `edit_zone_parent`: input_swich = `edit_zone_dte_limit_4`; break;
    case `edit_zone_dte_limit_4`: input_swich = `edit_zone_dte_limit_5`; break;
    case `edit_zone_dte_limit_5`: input_swich = `edit_zone_name`; break;

    // audio
    case `add_audio_name`: input_swich = `add_audio_time_start`; break;
    case `add_audio_time_start`: input_swich = `add_audio_file`; break;
    case `add_audio_file`:
      input_swich = `add_audio_enable`
      $('#button7 table tr').html(`<td onclick="popupListAudio('add_audio_file')"><i class="fas fa-hand-pointer"></i></td>`)
      break;
    case `add_audio_enable`: input_swich = `add_audio_no_loop`; break;
    case `add_audio_no_loop`:
      input_swich = `add_audio_week_loop`
      $('#button7 table tr').html(`<td onclick="$('#add_audio_no_loop input').prop('checked', true);popupDate('loop_audio', 'y-m-d')"><i class="fas fa-hand-pointer"></i></td>`)
      break;
    case `add_audio_week_loop`:
      input_swich = `add_audio_month_loop`
      $('#button7 table tr').html(`<td onclick="$('#add_audio_week_loop input').prop('checked', true); popupWeek('add_audio_week_loop')"><i class="fas fa-hand-pointer"></i></td>`)
      break;
    case `add_audio_month_loop`:
      input_swich = `add_audio_year_loop`
      $('#button7 table tr').html(`<td onclick="$('#add_audio_month_loop input').prop('checked', true);popupDate('loop_audio', 'd')"><i class="fas fa-hand-pointer"></i></td>`)
      break;
    case `add_audio_year_loop`:
      input_swich = `add_audio_name`
      $('#button7 table tr').html(`<td onclick="$('#add_audio_year_loop input').prop('checked', true);popupDate('loop_audio', 'm-d')"><i class="fas fa-hand-pointer"></i></td>`)
      break;


    case `edit_audio_name`: input_swich = `edit_audio_time_start`; break;
    case `edit_audio_time_start`: input_swich = `edit_audio_file`; break;
    case `edit_audio_file`:
      input_swich = `edit_audio_enable`
      $('#button7 table tr').html(`<td onclick="popupListAudio('edit_audio_file')"><i class="fas fa-hand-pointer"></i></td>`)
      break;
    case `edit_audio_enable`: input_swich = `edit_audio_no_loop`; break;
    case `edit_audio_no_loop`:
      input_swich = `edit_audio_week_loop`
      $('#button7 table tr').html(`<td onclick="$('#edit_audio_no_loop input').prop('checked', true);popupDate('edit_audio_no_loop', 'y-m-d')"><i class="fas fa-hand-pointer"></i></td>`)
      break;
    case `edit_audio_week_loop`:
      input_swich = `edit_audio_month_loop`
      $('#button7 table tr').html(`<td onclick="$('#edit_audio_week_loop input').prop('checked', true); popupWeek('edit_audio_week_loop')"><i class="fas fa-hand-pointer"></i></td>`)
      break;
    case `edit_audio_month_loop`:
      input_swich = `edit_audio_year_loop`
      $('#button7 table tr').html(`<td onclick="$('#edit_audio_month_loop input').prop('checked', true);popupDate('edit_audio_month_loop', 'd')"><i class="fas fa-hand-pointer"></i></td>`)
      break;
    case `edit_audio_year_loop`:
      input_swich = `edit_audio_name`
      $('#button7 table tr').html(`<td onclick="$('#edit_audio_year_loop input').prop('checked', true);popupDate('edit_audio_year_loop', 'm-d')"><i class="fas fa-hand-pointer"></i></td>`)
      break;

    // DTE
    case `add_dte_facp_id`: input_swich = `add_dte_facp_type`; break;
    case `add_dte_facp_type`: input_swich = `add_dte_facp_enable`; break;
    case `add_dte_facp_enable`: input_swich = `add_dte_facp_id`; break;
  }
}

function show_vitual_key(x) {
  console.info(`show_vitual_key()`);
  $(`select`).attr({ size: 1 })
  var type = $(`#${x}`).getType()
  switch (type) {
    case 'text':
    case 'password':
      $(`#${x}_keyboard`).show()
      button(2, ``, `"button_click('up')"`, `<i class="fas fa-arrow-up"></i>`)
      button(3, ``, `"button_click('down')"`, `<i class="fas fa-arrow-down"></i>`)
      button(4, ``, `"button_click('left')"`, `<i class="fas fa-arrow-left"></i>`)
      button(5, ``, `"button_click('right')"`, `<i class="fas fa-arrow-right"></i>`)
      button(7, ``, `"button_click('enter')"`, `<i class="fas fa-hand-pointer"></i><br>{button_click}`)
      break;
    case 'label':
      $('#button2').removeClass('w3-button w3-gray'); $('#button2 table tr').html(``)
      $('#button3').removeClass('w3-button w3-gray'); $('#button3 table tr').html(``)
      $('#button4').removeClass('w3-button w3-gray'); $('#button4 table tr').html(``)
      $('#button5').removeClass('w3-button w3-gray'); $('#button5 table tr').html(``)
      if ($(`#${x} input`).getType() == 'checkbox') {
        $('#button7').addClass('w3-button w3-gray') // Hiện nút Enter
        $('#button7 table tr').html(`<td onclick="checkbox_click('${x}')"><i class="fas fa-hand-pointer"></i></td>`)
      }
      break;
    case 'select':
      checkbox_up_down(x)
      $('#button4').removeClass('w3-button w3-gray'); $('#button4 table tr').html(``)
      $('#button5').removeClass('w3-button w3-gray'); $('#button5 table tr').html(``)
      break;
  }
}

function checkbox_up_down(x) {
  if ($(`#${x} > option:selected`).index() == 0) { // Đầu tiên trong select
    $('#button2').removeClass('w3-button w3-gray'); $('#button2 table tr').html(``)
  } else {
    button(2, ``, `"$('#${x} > option:selected').removeAttr('selected').prev('option').attr('selected', 'selected'); checkbox_up_down('${x}')"`, `<i class="fas fa-arrow-up"></i>`)
  }

  if ($(`#${x} > option:selected`).index() == $(`#${x} > option`).length - 1) { // cuối cùng trong select
    $('#button3').removeClass('w3-button w3-gray'); $('#button3 table tr').html(``)
  } else {
    button(3, ``, `"$('#${x} > option:selected').removeAttr('selected').next('option').attr('selected', 'selected'); checkbox_up_down('${x}')"`, `<i class="fas fa-arrow-down"></i>`)
  }
  if ($(`#${x} > option`).length >= 18) {
    $(`#${x}`).attr({ size: 18 })
  } else { $(`#${x}`).attr({ size: $(`#${x} > option`).length }) }
}

function checkbox_click(x) {
  if ($(`#${x} input`).is(":checked")) {
    $(`#${x} input`).prop('checked', false)
  } else { $(`#${x} input`).prop('checked', true) }
}