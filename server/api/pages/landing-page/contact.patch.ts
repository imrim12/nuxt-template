import type { ContactUsSectionType } from '~/types/landing-page'

export default defineEventHandler(async (event) => {
  const contactUsReqData = await readBody<ContactUsSectionType>(event)

  const { error } = await supabaseAdmin
    .from('sys_landing_page')
    .update({
      contact_us_card_heading: contactUsReqData.contact_us_card_heading,
      contact_us_card_image: contactUsReqData.contact_us_card_image,
      contact_us_card_content: contactUsReqData.contact_us_card_content,
      contact_us_card_title: contactUsReqData.contact_us_card_title,
      contact_us_title: contactUsReqData.contact_us_title,
      contact_us_title_desc: contactUsReqData.contact_us_title_desc as string,
    })
    .match({ id: 'df02f75c-afab-41ef-ab6d-e1aa04d7ec6d' })

  if (error)
    setResponseStatus(event, 400, error.message)
  else
    setResponseStatus(event, 201)

  return { success: true, status: 201 }
})
