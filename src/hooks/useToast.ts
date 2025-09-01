import { toast } from 'sonner'

export function useToast() {
    const showSuccess = (message: string, description?: string) => {
        toast.success(message, {
            description, action: {
                label: 'Close',
                onClick: () => toast.dismiss(),
            },
        })
    }

    const showError = (message: string, description?: string) => {
        toast.error(message, {
            description, action: {
                label: 'Close',
                onClick: () => toast.dismiss(),
            },
        })
    }

    const showInfo = (message: string, description?: string) => {
        toast.info(message, {
            description, action: {
                label: 'Close',
                onClick: () => toast.dismiss(),
            },
        })
    }

    const showWarning = (message: string, description?: string) => {
        toast.warning(message, {
            description, action: {
                label: 'Close',
                onClick: () => toast.dismiss(),
            },
        })
    }

    const showLoading = (message: string, description?: string) => {
        toast.loading(message, {
            description, action: {
                label: 'Close',
                onClick: () => toast.dismiss(),
            },
        })
    }

    return { showSuccess, showError, showInfo, showWarning, showLoading }
}