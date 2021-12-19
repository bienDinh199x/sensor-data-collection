/*
 ##       ####  ######  ########
 ##        ##  ##    ##    ##
 ##        ##  ##          ##
 ##        ##   ######     ##
 ##        ##        ##    ##
 ##        ##  ##    ##    ##
 ######## ####  ######     ##
*/

function managerLang() {
  change_layout(`manager_lang`, () => {
    $(`#manager_lang #title`).html(trans(`{setting_lang_title} <input oninput="w3.filterHTML('#table_lang', '.lang', this.value);setTimeout(()=>{setWidthTableLang()},200)" placeholder="&#xf002;">`))
    button(1, ``, `"setting()"`, `<i class="fas fa-reply"></i><br>{button_back}`) // Back
    if (user.length == 0) { button(6, ``, `"formLogin('manager_lang')"`, `<i class="fas fa-user-lock"></i><br>{button_unlock}`) }
    else { button(6, ``, `"formAddLang()"`, `<i class="fas fa-plus"></i><br>{button_add}`) }
    listLang()
  })
}

function listLang() {
  console.log(`listLang()`);
  h = `<tr><th onclick="w3.sortHTML('#table_lang','.lang', 'td:nth-child(1)')">{lang_add_edit_key}</th><th onclick="w3.sortHTML('#table_lang','.lang', 'td:nth-child(2)')">{lang_add_edit_vi}</th><th onclick="w3.sortHTML('#table_lang','.lang', 'td:nth-child(3)')">{lang_add_edit_en}</th><th onclick="w3.sortHTML('#table_lang','.lang', 'td:nth-child(4)')">{lang_add_edit_ja}</th></tr>`
  $(`#table_lang1`).html(trans(`<thead>${h}
    <tr style="display:none">
      <th><input id="lang_key"/></th><th><input id="lang_vi"/></th><th><input id="lang_en"/></th><th><input id="lang_ja"/></th>
    </tr>
    </thead>`))

  if (json_lang.length > 0) {
    h = `<tfoot>${h}</tfoot>`
    for (var i = 0; i < json_lang.length; i++) {
      h += `<tr id="lang_${json_lang[i].key}" class="lang" onclick="list_click='lang_${json_lang[i].key}'; selectLang()">
      <td><div id="select_top_lang_${json_lang[i].key}" tabindex=1 style="float:left;width:100%">${json_lang[i].key}</div><div id="select_bot_lang_${json_lang[i].key}" tabindex=1 style="float:left"></div></td><td>${json_lang[i].vi || ''}</td><td>${json_lang[i].en || ''}</td><td>${json_lang[i].ja || ''}</td>
      </tr> `
    }
  }
  $(`#table_lang`).html(trans(h))

  setWidthTableLang()
  if (json_lang.length > 0) { selectLang() }
}
function setWidthTableLang() {
  for (let i = 0; i < 4; i++) { $(`#table_lang1 thead tr:first-child th:eq(${i})`).css({ "width": $(`#table_lang tfoot tr:first-child th:eq(${i})`).width() + 7 }) }

}
function selectLang() {
  console.log(`selectLang()`);
  $(`.lang`).removeClass(`lang_border w3-border-red`)
  index_of(json_lang, `key`, list_click.slice(5), (i) => {
    if (i == -1) { i = 0 }
    list_click = `lang_${json_lang[i].key}`
    $(`#${list_click}`).addClass(`lang_border w3-border-red`)
    $(`#select_top_${list_click}`).focus(); $(`#select_bot_${list_click}`).focus() // focus đến nac được chọn
    $(`#manager_lang #title input`).focus(); w3.filterHTML('#table_lang', '.lang', $(`#manager_lang #title input`).val()); setTimeout(() => { setWidthTableLang() }, 200)

    if (i != 0) { button(2, ``, `"list_click='lang_${json_lang[i - 1].key}'; selectLang()"`, ` <i class="fas fa-chevron-up"></i> `) }
    else { removeButton(`.body #button2`) }
    if (i != json_lang.length - 1) { button(5, ``, `"list_click='lang_${json_lang[i + 1].key}'; selectLang()"`, ` <i class="fas fa-chevron-down"></i> `) }
    else { removeButton(`.body #button5`) }
    button(9, ``, `"formEditLang()"`, ` <i class="fas fa-edit"></i> <br>{button_edit}`)
    button(10, ``, `"confirmDeleteLang()"`, `<i class="fas fa-trash"></i><br>{button_delete}`)
  })
}

/*
    ###    ########  ########
   ## ##   ##     ## ##     ##
  ##   ##  ##     ## ##     ##
 ##     ## ##     ## ##     ##
 ######### ##     ## ##     ##
 ##     ## ##     ## ##     ##
 ##     ## ########  ########
*/
function formAddLang() {
  change_layout(`add_lang`, () => {
    $(`#add_lang #title`).html(trans(`{setting_lang_add_title}`))
    $(`#table_lang1 thead tr`).show()
    button(1, ``, `"managerLang()"`, `<i class="fas fa-reply"></i><br>{setting_lang_add_button_back}`)
    button(6, ``, `"button_input_swich()"`, `<i class="fas fa-exchange-alt"></i>`) // input switch
    button(9, ``, `"addLang()"`, `<i class="fas fa-save"></i><br>{setting_lang_add_button_save}`)
    button(10, ``, `"managerLang()"`, `<i class="fas fa-times"></i><br>{setting_lang_add_button_cancel}`)
    var h = `<table class="table_add_edit_io">
      <tr>
        <td style="width:120px">{lang_add_edit_key}</td><td><input id="add_lang_key" tabindex="1" onclick="inputClick('add_lang_key')"></td>
        <td style="width:120px">{lang_add_edit_vi}</td><td colspan=3><input id="add_lang_vi" tabindex="1" onclick="inputClick('add_lang_vi')"></td>
      </tr>
      <tr>
        <td>{lang_add_edit_en}</td><td><input id="add_lang_en" tabindex="1" onclick="inputClick('add_lang_en')"></td>
        <td>{lang_add_edit_ja}</td><td><input id="add_lang_ja" tabindex="1" onclick="inputClick('add_lang_ja')"></td>
      </tr>
    </table>`
    $('#add_lang #list').html(trans(h))
    keyboard('add_lang_ja')
    keyboard('add_lang_en')
    keyboard('add_lang_vi')
    keyboard('add_lang_key')
    $('.ui-keyboard').hide()
    inputClick('add_lang_key')
  })
}

function addLang() { socket.emit(`add_lang`, { key: $(`#add_lang_key`).val(), vi: $(`#add_lang_vi`).val(), en: $(`#add_lang_en`).val(), ja: $(`#add_lang_ja`).val() }) }

/*
 ######## ########  #### ########
 ##       ##     ##  ##     ##
 ##       ##     ##  ##     ##
 ######   ##     ##  ##     ##
 ##       ##     ##  ##     ##
 ##       ##     ##  ##     ##
 ######## ########  ####    ##
*/
function formEditLang() {
  change_layout(`edit_lang`, () => {
    $(`#edit_lang #title`).html(trans(`{setting_lang_edit_title}`))
    $(`#table_lang1 thead tr`).show()
    button(1, ``, `"managerLang()"`, `<i class="fas fa-reply"></i><br>{setting_lang_add_button_back}`)
    button(6, ``, `"button_input_swich()"`, `<i class="fas fa-exchange-alt"></i>`) // input switch
    button(9, ``, `"editLang()"`, `<i class="fas fa-save"></i><br>{setting_lang_add_button_save}`)
    button(10, ``, `"managerLang()"`, `<i class="fas fa-times"></i><br>{setting_lang_add_button_cancel}`)
    index_of(json_lang, `key`, list_click.slice(5), (i) => {
      if (i > -1) {
        var h = `<table class="table_add_edit_io">
          <tr>
            <td style="width:120px">{lang_add_edit_key}</td><td><input id="edit_lang_key" tabindex="1" onclick="inputClick('edit_lang_key')" disabled value="${json_lang[i].key}"></td>
            <td style="width:120px">{lang_add_edit_vi}</td><td colspan=3><input id="edit_lang_vi" tabindex="1" onclick="inputClick('edit_lang_vi')" value="${json_lang[i].vi}"></td>
          </tr>
          <tr>
            <td>{lang_add_edit_en}</td><td><input id="edit_lang_en" tabindex="1" onclick="inputClick('edit_lang_en')" value="${json_lang[i].en}"></td>
            <td>{lang_add_edit_ja}</td><td><input id="edit_lang_ja" tabindex="1" onclick="inputClick('edit_lang_ja')" value="${json_lang[i].ja}"></td>
          </tr>
        </table>`
        $('#edit_lang #list').html(trans(h))
        keyboard('edit_lang_ja')
        keyboard('edit_lang_en')
        keyboard('edit_lang_vi')
        $('.ui-keyboard').hide()
        inputClick('edit_lang_vi')
      } else { managerLang() }
    })
  })
}

function editLang() {
  console.info(`editLang()`);
  socket.emit(`edit_lang`, {
    key: $(`#edit_lang_key`).val(),
    vi: $(`#edit_lang_vi`).val(),
    en: $(`#edit_lang_en`).val(),
    ja: $(`#edit_lang_ja`).val()
  })
}

/*
 ########  ######## ##       ######## ######## ########
 ##     ## ##       ##       ##          ##    ##
 ##     ## ##       ##       ##          ##    ##
 ##     ## ######   ##       ######      ##    ######
 ##     ## ##       ##       ##          ##    ##
 ##     ## ##       ##       ##          ##    ##
 ########  ######## ######## ########    ##    ########
*/
function confirmDeleteLang() {
  index_of(json_lang, `key`, list_click.slice(5), (i) => {
    $(`.popup`).show()
    removePopupButton(() => {
      $(`.popup_main`).html(trans(`<div class="w3-red" style="border-radius: 20px;text-align: center;font-size: 35px;margin-top: 201px;height: 120px;line-height: 120px;">{lang_check_delete} <b>${json_lang[i].key}</b>?</div>`))
      popupButton(9, ``, `"socket.emit('delete_lang', { key: '${json_lang[i].key}'})"`, `<i class="fas fa-trash"></i><br>{button_delete}`)
      popupButton(10, ``, `"$('.popup').hide()"`, `<i class="fas fa-times"></i><br>{button_cancel}`)
    })
  })
}