<div align=center>

# [SvelteKit Validator](https://github.com/aidlran/sveltekit-validator)

**[class-validator](https://github.com/typestack/class-validator) integration for SvelteKit.**

</div>

## About

This package makes form validation in SvelteKit powerful by integrating [class-validator](https://github.com/typestack/class-validator) and decorator-based DTO validation into your SvelteKit application. If you've ever used NestJS, you'll feel right at home with this.

## Installation

This design pattern is based on decorators so you'll need to have your project set up with TypeScript.

Install this package and its peer dependency `class-validator`:

```sh
npm i "aidlran/sveltekit-validator#preview" "class-validator"
```

Make sure your `tsconfig` is configured for decorators:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

## Usage

First, let's make a simple form in a page component.

```html
<!-- +page.svelte -->
<form method="POST">
  <label>
    Email
    <input name="email" type="email" />
  </label>
  <label>
    Username
    <input name="username" />
  </label>
  <label>
    Password
    <input name="password" type="password" />
  </label>
  <label>
    Name
    <input name="name" />
  </label>
  <input type="submit" value="Sign Up" />
</form>
```

---

Now we make a DTO class using the powerful [class-validator](https://github.com/typestack/class-validator) library to describe the data you expect your [action](https://kit.svelte.dev/docs/form-actions) to receive. The value of the form input **name** attribute should match the name of the property on the class.

```ts
// user-create.dto.ts

import {
  IsAlphanumeric,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UserCreateDTO {
  @IsEmail()
  email: string;

  @IsAlphanumeric()
  username: string;

  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsString()
  name?: string;
}
```

---

Now we need to write some logic to handle the POST action. Let's create a controller class with a method to handle it so that we can add the `ValidateFormData` decorator.

We need to import the DTO class we created and supply it to the decorator.

```ts
// user.controller.ts

import { type RequestEvent } from '@sveltejs/kit';
import { ValidateFormData } from 'sveltekit-validator';
import { UserCreateDTO } from './user-create.dto';

class UserController {
  @ValidateFormData(UserCreateDTO)
  post(event: RequestEvent & { request: { dto: UserCreateDTO } }) {
    const createdUser = user.createOne(event.request.dto);
    return { user: createdUser };
  }
}

export const userController = new UserController();
```

The decorator handles the validation for us and even automatically sends a `400` response on validation failure. This means it'll prevent our method from even executing if validation fails! This behaviour will be configurable in a future release.

On validation success, the decorator will add the instantiated DTO instance to the request object. We can access it with `request.dto` and use it to continue processing the request safe in the knowledge that we have valid data to work with.

---

Lastly, we register our method as a form action in `+page.server.ts`:

```ts
// +page.server.ts

import type { Actions } from './$types';
import { userController } from './user.controller';

export const actions: Actions = {
  default: userController.post,
};
```

That's it! Now if we add the `form` property to our page's script tag, we can use the response:

```svelte
<!-- +page.svelte -->
<script lang="ts">
  export let form;
</script>

{#if form?.user}
  <p>The data was valid!</p>
{/if}

{#if form?.errors}
  <p>The data was not valid!</p>
{/if}
```

### Decorator Validation Error Response

If you're using the decorator, an error response would typically would look something like this:

```js
{
  errors: {
    email: [ 'email must be an email' ],
    username: [ 'username must contain only letters and numbers' ],
    password: [ 'password is not strong enough' ]
  }
}
```

The error response will have an `errors` object where the key is the name of the input and the value is an array of error messages. See [here](https://github.com/typestack/class-validator#validation-messages) for more on how to customise these error messages with class-validator.

# Caveats

With an enhanced form, you may encounter inconsistencies depending on whether JavaScript is enabled or disabled in the browser. If JavaScript is unavailable, the browser likely won't omit an empty input from the body, but rather it will send it as a blank string. This means you may have problems if you try to combine `IsOptional` with other validators. To combat this I tend to combine `IsOptional` with `Matches` to validate with a regex.
