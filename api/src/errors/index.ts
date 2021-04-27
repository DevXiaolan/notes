import { HTTP_STATUS, MohismError } from '@mohism/core';

const { NotFound, Forbidden} = HTTP_STATUS;

export const ErrUserNotFound = new MohismError('user not found').setStatus(NotFound);

export const ErrSecretNotMatch = new MohismError('secret not match').setStatus(Forbidden);
