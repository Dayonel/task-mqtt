## Installation
Install [Mosquitto](https://mosquitto.org/download/)
Add to env variable or navigate where installed

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

## Run a function
```
deno run --allow-net .\supabase\functions\light\index.ts
```

## Run mosquitto
```
mosquitto -v
```

## Publish a message

```
mosquitto_pub -h test.mosquitto.org -t 'topic1' -m 'hello'
```