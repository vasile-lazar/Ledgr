import { useState, type SubmitEventHandler } from 'react';
import { Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';

export const Profile: React.FC = () => {
    const { user } = useAuth();
    const { updateProfile, changePassword, isUpdatingProfile, isChangingPassword } = useProfile();

    const [username, setUsername] = useState(user?.username ?? '');
    const [email, setEmail] = useState(user?.email ?? '');

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    if (!user) return null;

    const handleProfileSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(username, email);
            toast.success('Profile updated.');
        } catch {
            toast.error('Could not update profile — email may already be in use.');
        }
    };

    const handlePasswordSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            toast.error('New passwords do not match.');
            return;
        }
        try {
            await changePassword(currentPassword, newPassword, confirmNewPassword);
            toast.success('Password updated.');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch {
            toast.error('Current password is incorrect.');
        }
    };

    return (
        <div className="p-4 md:p-6">
            <div className="mx-auto max-w-2xl space-y-6">
                <div className="rounded-[30px] border border-border bg-card p-5 md:p-7">
                    <div className="relative overflow-hidden rounded-[22px] p-5 md:p-6 border border-border mb-6">
                        <div className="absolute -right-12 -top-14 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
                        <div className="absolute -bottom-12 left-10 h-36 w-36 rounded-full bg-violet-500/10 blur-3xl" />
                        <div className="relative flex items-center gap-4">
                            <Avatar name={user.username} size="xl" className="ring-4 ring-background" />
                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                                    {user.username}
                                </h1>
                                <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                Username
                            </label>
                            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="email" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                Email
                            </label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="flex justify-end pt-2">
                            <Button type="submit" disabled={isUpdatingProfile} variant="primary" size="custom" className="rounded-xl px-5 py-2.5 text-sm font-medium">
                                {isUpdatingProfile ? 'Saving…' : 'Save changes'}
                            </Button>
                        </div>
                    </form>
                </div>

                <div className="rounded-[30px] border border-border bg-card p-5 md:p-7">
                    <div className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
                        <Lock size={14} /> Change password
                    </div>

                    <form onSubmit={handlePasswordSubmit} className="space-y-3">
                        <div>
                            <label htmlFor="currentPassword" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                Current password
                            </label>
                            <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" />
                        </div>
                        <div>
                            <label htmlFor="newPassword" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                New password
                            </label>
                            <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" />
                        </div>
                        <div>
                            <label htmlFor="confirmNewPassword" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                Confirm new password
                            </label>
                            <Input id="confirmNewPassword" type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder="••••••••" />
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button type="submit" disabled={isChangingPassword} variant="primary" size="custom" className="rounded-xl px-5 py-2.5 text-sm font-medium">
                                {isChangingPassword ? 'Updating…' : 'Update password'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};