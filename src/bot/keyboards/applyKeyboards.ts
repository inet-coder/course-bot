import { InlineKeyboard, Keyboard } from 'grammy';

export function phoneRequestKeyboard(): Keyboard {
  return new Keyboard().requestContact('📞 Telefon raqamni yuborish').resized().oneTime();
}

export function applicationDecisionKeyboard(applicationId: number): InlineKeyboard {
  return new InlineKeyboard()
    .text('✅ Qabul qilish', `app_accept_${applicationId}`)
    .text('❌ Rad etish', `app_reject_${applicationId}`)
    .row()
    .text('📞 Bog\'lanish', `app_contact_${applicationId}`);
}

export function confirmApplicationKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('✅ Tasdiqlash', 'apply_confirm')
    .text('❌ Bekor qilish', 'apply_cancel');
}
