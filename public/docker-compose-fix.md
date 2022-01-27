## 

File added to force git to add /public folder

If /public isn't include delete the following line from the Dockerfile

COPY --from=builder /my-project/public ./public
