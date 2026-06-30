// shared/utils/date.ts
import { format, formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

const locale = { locale: vi };

export const formatTime = (d: Date | null, formatString: string) => (d ? format(d, formatString, locale) : "--:--");

export const formatDate = (d: Date | null, formatString: string) => (d ? format(d, formatString, locale) : "--/--");

export const formatDateTime = (d: Date | null, formatString: string) => (d ? format(d, formatString, locale) : "--:--");

export const formatRelative = (d: Date | null) => (d ? formatDistanceToNow(d, { ...locale, addSuffix: true }) : "");
