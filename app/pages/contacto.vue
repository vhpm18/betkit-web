<script setup lang="ts">
const { t } = useI18n()
const page = usePageMessages<{
  title: string
  subtitle: string
  emailLabel: string
  whatsappLabel: string
  whatsappValue: string
  supportLabel: string
  responseTime: string
  formTitle: string
  formDesc: string
  form: {
    name: string, namePh: string, email: string, emailPh: string
    subject: string, subjectPh: string
    message: string, messagePh: string, submit: string
    required: string, mailNote: string
  }
}>('contactPage')

// Emails kept out of i18n to avoid vue-i18n `@` linked-format issues.
const CONTACT_EMAIL = 'info@betkit.com'
const SUPPORT_EMAIL = 'soporte@betkit.com'

const contactInfo = computed(() => [
  { label: page.emailLabel, value: CONTACT_EMAIL },
  { label: page.whatsappLabel, value: page.whatsappValue },
  { label: page.supportLabel, value: SUPPORT_EMAIL },
])

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const fieldsTouched = reactive<Record<'name' | 'email', boolean>>({
  name: false,
  email: false,
})

function isValid(value: string): boolean {
  return value.trim().length > 0
}

function showInvalid(field: 'name' | 'email'): boolean {
  return fieldsTouched[field] && !isValid(form[field])
}

const mailtoHref = computed(() =>
  buildMailto('info@betkit.com', form.subject || page.formTitle, [
    { label: page.form.name, value: form.name },
    { label: page.form.email, value: form.email },
    { label: page.form.subject, value: form.subject },
    { label: page.form.message, value: form.message },
  ]),
)

function onSubmit() {
  fieldsTouched.name = true
  fieldsTouched.email = true
  if (!isValid(form.name) || !isValid(form.email))
    return
  window.location.href = mailtoHref.value
}

useHead({
  title: () => t('contactPage.title'),
  meta: [
    { name: 'description', content: () => t('contactPage.subtitle') },
    { name: 'robots', content: 'index, follow' },
  ],
})
</script>

<template>
  <div class="bg-surface text-on-surface font-body">
    <!-- Hero -->
    <section class="relative py-20 md:py-28 overflow-hidden hud-grid">
      <!-- Ambient glow behind hero -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-yellow/10 blur-[130px] rounded-full pointer-events-none z-0" aria-hidden="true"></div>
      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
        <h1 class="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-foreground">
          {{ page.title }}
        </h1>
        <p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {{ page.subtitle }}
        </p>
      </div>
    </section>

    <!-- Contact Info -->
    <section class="py-16">
      <div class="max-w-2xl mx-auto px-6 space-y-6">
        <div v-for="(info, i) in contactInfo" :key="i" class="rounded-xl bg-surface-container shadow-lg p-8 flex items-center gap-6">
          <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 flex-shrink-0">
            <Icon name="lucide:mail" :size="20" class="text-primary" aria-hidden="true" />
          </div>
          <div>
            <span class="text-muted-foreground text-xs font-mono uppercase tracking-wider">{{ info.label }}</span>
            <p class="text-foreground font-medium mt-1">{{ info.value }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact form -->
    <section class="py-16">
      <div class="max-w-2xl mx-auto px-6">
        <div class="rounded-xl bg-surface-container shadow-lg p-8 md:p-10 space-y-6">
          <div class="space-y-2">
            <h2 class="text-2xl font-display font-bold uppercase text-foreground">
              {{ page.formTitle }}
            </h2>
            <p class="text-muted-foreground text-sm leading-relaxed">
              {{ page.formDesc }}
            </p>
          </div>

          <form class="space-y-5" novalidate @submit.prevent="onSubmit">
            <div>
              <label for="contact-name" class="block text-sm font-medium text-slate-200 mb-1.5">
                {{ page.form.name }} <span class="text-primary" aria-hidden="true">*</span>
                <span class="sr-only">({{ page.form.required }})</span>
              </label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                required
                :aria-required="true"
                :placeholder="page.form.namePh"
                :aria-invalid="showInvalid('name') || undefined"
                class="w-full bg-surface-container-lowest border border-border rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent"
              >
            </div>

            <div>
              <label for="contact-email" class="block text-sm font-medium text-slate-200 mb-1.5">
                {{ page.form.email }} <span class="text-primary" aria-hidden="true">*</span>
                <span class="sr-only">({{ page.form.required }})</span>
              </label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                required
                :aria-required="true"
                :placeholder="page.form.emailPh"
                :aria-invalid="showInvalid('email') || undefined"
                class="w-full bg-surface-container-lowest border border-border rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent"
              >
            </div>

            <div>
              <label for="contact-subject" class="block text-sm font-medium text-slate-200 mb-1.5">{{ page.form.subject }}</label>
              <input
                id="contact-subject"
                v-model="form.subject"
                type="text"
                :placeholder="page.form.subjectPh"
                class="w-full bg-surface-container-lowest border border-border rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent"
              >
            </div>

            <div>
              <label for="contact-message" class="block text-sm font-medium text-slate-200 mb-1.5">
                {{ page.form.message }} <span class="text-primary" aria-hidden="true">*</span>
                <span class="sr-only">({{ page.form.required }})</span>
              </label>
              <textarea
                id="contact-message"
                v-model="form.message"
                rows="5"
                required
                :aria-required="true"
                :placeholder="page.form.messagePh"
                class="w-full bg-surface-container-lowest border border-border rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent"
              />
            </div>

            <button
              type="submit"
              class="w-full bg-primary hover:bg-brand-hover text-black font-bold text-sm rounded-xl px-7 py-3.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              {{ page.form.submit }}
            </button>

            <p class="text-xs text-muted-foreground leading-relaxed">
              {{ page.form.mailNote }}
            </p>
          </form>
        </div>
      </div>
    </section>

    <!-- Note -->
    <section class="pb-24 pt-2">
      <div class="max-w-2xl mx-auto px-6 text-center">
        <p class="text-muted-foreground text-sm">
          {{ page.responseTime }}
        </p>
      </div>
    </section>
  </div>
</template>
