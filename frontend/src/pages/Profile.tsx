import { useState } from 'react';
import {  Camera, Lock } from 'lucide-react';
import Avatar from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function Profile() {
  const [currency, setCurrency] = useState('RON');

  return (
      <div className="p-4 md:p-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-2">

            {/* COLUMN 1: Profile + Personal Info */}
            <div className="rounded-[30px] border border-border bg-card p-5 md:p-7">
              <div className="space-y-6">
                {/* Profile Header Block */}
                <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-primary/12 via-background to-violet-500/8 p-5 md:p-6 border border-border">
                  <div className="absolute -right-12 -top-14 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
                  <div className="absolute -bottom-12 left-10 h-36 w-36 rounded-full bg-violet-500/10 blur-3xl" />

                  <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar name="Alexandru Ionescu" size="xl" className="ring-4 ring-background" />
                        <button
                            type="button"
                            aria-label="Change profile photo"
                            className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-foreground hover:bg-muted"
                        >
                          <Camera size={14} />
                        </button>
                      </div>

                      <div>
                        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Alexandru Ionescu</h1>
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                    </div>
                  </div>

                 
                </div>

                {/* Personal information */}
                <div className="space-y-6 pt-2">
                  <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">Personal information</p>
                      </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="group">
                      <label htmlFor="profile-First name" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                        First name
                      </label>
                      <Input id="profile-First name" defaultValue="Alexandru" className="rounded-2xl border-border bg-background py-2.5 text-sm transition-all duration-200 group-focus-within:border-primary" />
                    </div>
                    <div className="group">
                      <label htmlFor="profile-Last name" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                        Last name
                      </label>
                      <Input id="profile-Last name" defaultValue="Ionescu" className="rounded-2xl border-border bg-background py-2.5 text-sm transition-all duration-200 group-focus-within:border-primary" />
                    </div>
                    <div className="group">
                      <label htmlFor="profile-Email" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                        Email
                      </label>
                      <Input id="profile-Email" defaultValue="alex.ionescu@gmail.com" className="rounded-2xl border-border bg-background py-2.5 text-sm transition-all duration-200 group-focus-within:border-primary" />
                    </div>
                    <div className="group">
                      <label htmlFor="profile-Phone" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                        Phone
                      </label>
                      <Input id="profile-Phone" defaultValue="+40 721 000 000" className="rounded-2xl border-border bg-background py-2.5 text-sm transition-all duration-200 group-focus-within:border-primary" />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button variant="primary" size="custom" className="rounded-xl px-5 py-2.5 text-sm font-medium">
                      Save changes
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 2: Settings */}
            <div className="rounded-[30px] border border-border bg-card p-5 md:p-7">
              <div className="space-y-6">
                {/* Currency settings */}
                <div className="rounded-[22px] border border-border bg-muted/25 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Profile settings</p>
                      <p className="mt-1 text-sm text-muted-foreground">Choose the primary currency used in the interface and reports.</p>
                    </div>
 
                    <div className="flex items-center gap-3">
                      <label htmlFor="profile-currency" className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                        Currency
                      </label>
                      <select
                          id="profile-currency"
                          value={currency}
                          onChange={(event) => setCurrency(event.target.value)}
                          className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary"
                      >
                        <option value="RON">RON</option>
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                      </select>
                    </div>
                  </div>
                </div>
 
                {/* Password change section */}
                <div className="rounded-[22px] border border-border bg-muted/25 p-4">
                  <div className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
                    <Lock size={14} /> Change password
                  </div>
 
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="security-Current password" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                        Current password
                      </label>
                      <Input id="security-Current password" type="password" placeholder="••••••••" className="rounded-2xl border-border bg-background py-2.5 text-sm" />
                    </div>
                    <div>
                      <label htmlFor="security-New password" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                        New password
                      </label>
                      <Input id="security-New password" type="password" placeholder="••••••••" className="rounded-2xl border-border bg-background py-2.5 text-sm" />
                    </div>
                    <div>
                      <label htmlFor="security-Confirm new password" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                        Confirm new password
                      </label>
                      <Input id="security-Confirm new password" type="password" placeholder="••••••••" className="rounded-2xl border-border bg-background py-2.5 text-sm" />
                    </div>
                  </div>
 
                  <div className="mt-4 flex justify-end">
                    <Button variant="primary" size="custom" className="rounded-xl px-5 py-2.5 text-sm font-medium">
                      Update password
                    </Button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
  );
}