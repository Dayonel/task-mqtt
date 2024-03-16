## Run project
```
npm run dev
```

## Add a migration
```
npm run generate
```

## Run supabase locally
```
supabase start
```

## Apply migration locally
```
supabase db reset
```

## Create a new function
```
supabase functions new hello-world
```

## Deploy db
```
supabase db push
```

## Deploy a function
```
supabase functions deploy
```

## Example query
POST http://localhost:54321/functions/v1/sensor/1/light
```
{
    "intensity": 5 
}
```