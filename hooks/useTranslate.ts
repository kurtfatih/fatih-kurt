import { enContent, trContent } from '../constant/content/text'

export const useTranslate = (locale?: string) => {
  const translate = <
    T extends 'navbar' | 'home' | 'aboutme' | 'skills' | 'jobs' | 'jobs_detail'
  >(
    key: T
  ) => {
    if (locale === 'tr') {
      return trContent[key]
    }
    return enContent[key]
  }
  return translate
}
